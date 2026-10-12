/**
 * Turn whatever a request threw into a sentence a person can act on.
 * Axios errors say "Request failed with status code 401"; the useful text is
 * in `response.data.detail` (FastAPI), so read that first.
 */
export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Try again.",
): string {
  if (typeof error === "object" && error !== null) {
    const e = error as {
      response?: { data?: { detail?: unknown } };
      code?: string;
      message?: string;
    };

    const detail = e.response?.data?.detail;
    if (typeof detail === "string" && detail) return detail;

    // FastAPI/Pydantic validation errors: [{ loc: [...], msg: "..." }]
    if (Array.isArray(detail) && detail.length > 0) {
      const first = detail[0] as { loc?: unknown[]; msg?: unknown };
      if (typeof first?.msg === "string") {
        const field = Array.isArray(first.loc) ? String(first.loc[first.loc.length - 1] ?? "") : "";
        return field && field !== "body" ? `${capitalize(field.replace(/_/g, " "))}: ${first.msg}` : first.msg;
      }
    }

    if (isNetworkError(error)) {
      return "Can't reach the server. Check your connection and try again.";
    }
    if (e.code === "ECONNABORTED") {
      return "The server took too long to respond. Try again.";
    }
  }

  if (error instanceof Error && error.message && !/status code/i.test(error.message)) {
    return error.message;
  }
  return fallback;
}

/** True when the request never got a response (server down, offline, CORS). */
export function isNetworkError(error: unknown): boolean {
  if (typeof error !== "object" || error === null) return false;
  const e = error as { code?: string; message?: string; response?: unknown };
  return !e.response && (e.code === "ERR_NETWORK" || e.message === "Network Error");
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
