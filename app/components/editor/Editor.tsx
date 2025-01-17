import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useEffect, useState } from "react";
import FloatingToolbarPlugin from "../plugins/floating-toolbar-plugin/FloatingToolbarPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { LinkNode } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  COMMAND_PRIORITY_HIGH,
  KEY_DOWN_COMMAND,
  KEY_ENTER_COMMAND,
} from "lexical";

const theme = {};

function onError(error: Error) {
  console.error(error);
}

function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [LinkNode],
  };

  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <div className="editor relative z-10" ref={onRef}>
            <ContentEditable className="ring-0 outline-none border-none" />
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
        placeholder={
          <div className="absolute left-0 top-0 z-0 text-gray-400">
            Write something or enter / for commands ...
          </div>
        }
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <LinkPlugin />
      {floatingAnchorElem && (
        <FloatingToolbarPlugin anchorElem={floatingAnchorElem} />
      )}
      <ShiftReturnPlugin />
    </LexicalComposer>
  );
}

function ShiftReturnPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerCommand(
      KEY_DOWN_COMMAND,
      (event) => {
        if (event.shiftKey && event.key === "Enter") {
          // Prevent the default behavior for Shift+Enter
          event.preventDefault();

          // Dispatch the same command as pressing Enter
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

export default Editor;
