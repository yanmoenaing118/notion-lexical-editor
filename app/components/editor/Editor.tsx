import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useState } from "react";

const theme = {};

function onError(error: Error) {
  console.error(error);
}

function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
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
          <div className="editor relative z-10">
            <ContentEditable className="ring-0 outline-none border-none" />
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}

        placeholder={<div className="absolute left-0 top-0 z-0 text-gray-400">Write something or enter / for commands ...</div>}

      />
      <HistoryPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  );
}

export default Editor;
