import useFloatingToolbarPlugin from "@/app/hooks/useFloatingToolbarPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { createPortal } from "react-dom";
import FloatingToolbar from "./FloatingToolbar";

export default function FloatingToolbarPlugin({
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement;
}) {
  const [editor] = useLexicalComposerContext();
  const { isText, showLinkEditor, setShowLinkEditor, linkUrl } =
    useFloatingToolbarPlugin({
      editor,
    });

  if (!isText && !showLinkEditor) {
    return null;
  }

  return createPortal(
    <FloatingToolbar
      anchorElem={anchorElem}
      editor={editor}
      showLinkEditor={showLinkEditor}
      setShowLinkEditor={setShowLinkEditor}
      linkUrl={linkUrl}
    />,
    anchorElem,
  );
}
