
export default function FloatingLinkEditor({ rect }: { rect: DOMRect | null }) {
  if (!rect) return null;

  const x = rect.x;
  const y = rect.y + rect.height + 30;

  return (
    <div
      className="FloatingLinkEditor fixed left-0 top-0 bg-white shadow-md p-1"
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      FloatingLinkEditor
    </div>
  );
}
