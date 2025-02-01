import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorState } from "lexical";
import { useEffect } from "react";

type Props = {
  onChange: (editorState: EditorState) => void;
};

const EditorOnChangePlugin: React.FC<Props> = ({ onChange }) => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.setEditorState(
      editor.parseEditorState(
        `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Hello who are you","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"what do you","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
      ),
    );
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, []);
  return null;
};

export default EditorOnChangePlugin;
