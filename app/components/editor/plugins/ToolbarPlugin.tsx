import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useState } from "react";

const ToolbarPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const [url, setUrl] = useState("");

  const addLink = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
      url,
    });
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
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
