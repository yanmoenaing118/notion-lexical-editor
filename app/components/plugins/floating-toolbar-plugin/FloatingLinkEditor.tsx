import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Dispatch, useState } from "react";

export default function FloatingLinkEditor({
  rect,
  setShowLinkEditor,
  linkUrl,
}: {
  rect: DOMRect | null;
  setShowLinkEditor: Dispatch<boolean>;
  linkUrl: string;
}) {
  if (!rect) return null;

  const x = rect.x;
  const y = rect.y + rect.height + 30;
  const [editor] = useLexicalComposerContext();
  const [link, setLink] = useState(linkUrl || "");
  return (
    <form
      className="FloatingLinkEditor fixed left-0 top-0 bg-white shadow-md p-1"
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      onSubmit={(e) => {
        e.preventDefault();
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, link);
        setShowLinkEditor(false);
      }}
    >
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      
    </form>
  );
}
