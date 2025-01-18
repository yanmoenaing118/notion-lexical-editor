import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  COMMAND_PRIORITY_HIGH,
  KEY_DOWN_COMMAND,
  KEY_ENTER_COMMAND,
} from "lexical";
import { useEffect } from "react";

function ShiftReturnPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerCommand(
      KEY_DOWN_COMMAND,
      (event) => {
        if (event.shiftKey && event.key === "Enter") {
          event.preventDefault();

          editor.dispatchCommand(KEY_ENTER_COMMAND, null);
          return true;
        } else if (event.key === "Enter") {
          event.preventDefault();
          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_HIGH,
    );
  }, [editor]);
  return null;
}

export default ShiftReturnPlugin;
