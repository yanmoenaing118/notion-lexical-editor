import { useRef } from "react";

export default function FloatingLinkEditor() {
  const linkEditorRef = useRef<HTMLDivElement | null>(null);

  return <div className="FloatingLinkEditor">FloatingLinkEditor</div>;
}
