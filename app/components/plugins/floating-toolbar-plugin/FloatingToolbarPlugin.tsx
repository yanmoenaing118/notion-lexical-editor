import useFloatingToolbarPlugin from "@/app/hooks/useFloatingToolbarPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { createPortal } from "react-dom";

export default function FloatingToolbarPlugin({
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement;
}) {
  const [editor] = useLexicalComposerContext();
  const { popupCharStylesEditorRef } = useFloatingToolbarPlugin({
    anchorElem,
    editor,
  });

  return createPortal(
    <div
      ref={popupCharStylesEditorRef}
      className="FloatingToolbarPlugin shadow-lg rounded-sm p-3 border border-gray-100 absolute z-30 bg-white top-0 left-0 opacity-0"
    >
      <div className="flex gap-3 items-center">
        <button>B</button>
        <button>I</button>
        <button>U</button>
      </div>
    </div>,
    anchorElem,
  );
}
