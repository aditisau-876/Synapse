import { Link } from "react-router-dom";

const URL_RE = /(https?:\/\/[^\s<]+[^\s<.,;:!?)\]'"])/g;

/** Turns URLs in message text into links. Meeting links open inside the app. */
export function linkify(text: string): React.ReactNode[] {
  return text.split(URL_RE).map((part, i) => {
    if (i % 2 === 0) return part;
    try {
      const url = new URL(part);
      if (url.origin === window.location.origin) {
        return (
          <Link key={i} to={url.pathname + url.search} className="font-medium underline underline-offset-2">
            {url.pathname.startsWith("/app/meetings/") ? "Join the meeting" : part}
          </Link>
        );
      }
    } catch {
      return part;
    }
    return (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 break-all">
        {part}
      </a>
    );
  });
}
