import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  getDOMSelection,
  LexicalEditor,
} from "lexical";
import { useCallback, useEffect, useState } from "react";

const useFloatingToolbarPlugin = ({ editor }: { editor: LexicalEditor }) => {

  const [isText, setIsText] = useState(false);

  const updatePopup = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      const nativeSelection = getDOMSelection(editor._window);
      const rootElement = editor.getRootElement();
      console.log("updatePopu");
      if (
        nativeSelection !== null &&
        (!$isRangeSelection(selection) ||
          rootElement === null ||
          !rootElement.contains(nativeSelection.anchorNode))
      ) {
        console.log("updatePopu first cond");

        setIsText(false);
        return;
      }

      if (!$isRangeSelection(selection)) {
        console.log("updatePopu second cond");

        setIsText(false);
        return;
      }

      if (selection.getTextContent() !== "") {
        const anchorNode = selection.anchor.getNode();
        const focusNode = selection.focus.getNode();

        const isText = $isTextNode(anchorNode) && $isTextNode(focusNode);
        console.log("updatePopu third cond", isText);

        setIsText(isText);
        return;
      }
      setIsText(false);
    });
  }, [editor]);

  useEffect(() => {
    document.addEventListener("selectionchange", updatePopup);
    return () => {
      document.removeEventListener("selectionchange", updatePopup);
    };
  }, [updatePopup]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(() => {
        updatePopup();
      }),
      editor.registerRootListener(() => {
        if (editor.getRootElement() === null) {
          setIsText(false);
        }
      }),
    );
  }, [editor, updatePopup]);
  return { isText };
};

export default useFloatingToolbarPlugin;
