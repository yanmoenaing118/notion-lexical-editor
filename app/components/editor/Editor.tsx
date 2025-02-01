import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useState } from "react";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { LinkNode } from "@lexical/link";
import FloatingToolbarPlugin from "./plugins/FloatingToolbarPlugin";
import EditorOnChangePlugin from "./plugins/EditorOnChangePlugin";
import { EditorState, EditorThemeClasses } from "lexical";
import ToolbarPlugin from "./plugins/ToolbarPlugin";

const theme: EditorThemeClasses = {
  link: "link",
};

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

  const handleOnChange = (editorState: EditorState) => {
    const jsonObj = editorState.toJSON();
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={
          <div
            className="editor relative z-10 border border-red-300"
            ref={onRef}
          >
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
      <EditorOnChangePlugin onChange={handleOnChange} />
      <HistoryPlugin />
      <AutoFocusPlugin />

      <LinkPlugin />
      {floatingAnchorElem && (
        <FloatingToolbarPlugin anchorElement={floatingAnchorElem} />
      )}
    </LexicalComposer>
  );
}


export default Editor;