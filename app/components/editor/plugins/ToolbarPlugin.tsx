import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useEffect, useState } from "react";
import { $getSelection, $isRangeSelection, getDOMSelection } from "lexical";

const ToolbarPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const [url, setUrl] = useState("");

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        const nativeSelection = getDOMSelection(editor._window);
        const rootElement = editor.getRootElement();

        if (
          nativeSelection !== null &&
          (!$isRangeSelection(selection) ||
            rootElement === null ||
            !rootElement.contains(nativeSelection.anchorNode))
        ) {
          console.log("it is not text");
          return;
        }

        if ($isRangeSelection(selection)) {
          console.log("Range selection");
        } else {
          console.log("Not Range selection");
        }

        console.log(selection?.getTextContent());
      });
    });
  }, [editor]);

  const addLink = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
      url,
    });
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      editor.read(() => {
        const s = $getSelection();
        console.log("before adding link", s?.getTextContent());
        console.log("iscoll", s?.isCollapsed())
      });
      addLink();
    }
  };

  return (
    <div className="absolute left-0 top-0 w-full p-3 -translate-y-full">
      <button onClick={addLink}>Link</button>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleSubmit}
      />
    </div>
  );
};

export default ToolbarPlugin;
