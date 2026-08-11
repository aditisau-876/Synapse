interface Props {
  x: number;
  y: number;
  color: string;
  name: string;
}

export default function CursorIndicator({
  x,
  y,
  color,
  name,
}: Props) {
  return (
    <div
      className="absolute pointer-events-none z-50"
      style={{
        left: x,
        top: y,
      }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill={color}
      >
        <path d="M4 2L19 13L12 14L15 22L12 23L9 15L4 20Z" />
      </svg>

      <div
        className="mt-1 rounded-full px-3 py-1 text-xs text-white shadow-lg"
        style={{
          background: color,
        }}
      >
        {name}
      </div>
    </div>
  );
}