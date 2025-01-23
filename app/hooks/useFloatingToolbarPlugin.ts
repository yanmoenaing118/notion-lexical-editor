import { $isAutoLinkNode } from "@lexical/link";
import { $isLinkNode } from "@lexical/link";
import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  getDOMSelection,
  LexicalEditor,
} from "lexical";
import { useCallback, useEffect, useState } from "react";
import { getSelectedNode } from "../utils/getSelectedNode";
import { $findMatchingParent, mergeRegister } from "@lexical/utils";

const useFloatingToolbarPlugin = ({ editor }: { editor: LexicalEditor }) => {
  const [isText, setIsText] = useState(false);
  const [showLinkEditor, setShowLinkEditor] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const updatePopup = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      const nativeSelection = getDOMSelection(editor._window);
      const rootElement = editor.getRootElement();

      if ($isRangeSelection(selection)) {
        const focusNode = getSelectedNode(selection);
        const focusLinkNode = $findMatchingParent(focusNode, $isLinkNode);
        const focusAutoLinkNode = $findMatchingParent(
          focusNode,
          $isAutoLinkNode,
        );
        if (focusLinkNode || focusAutoLinkNode) {
          setIsLink(true);
          if (focusLinkNode) {
            setLinkUrl(focusLinkNode.getURL());
          } else if (focusAutoLinkNode) {
            setLinkUrl(focusAutoLinkNode.getURL());
          }
        } else {
          setIsLink(false);
          setLinkUrl("")
        }
      }

      if (
        nativeSelection !== null &&
        (!$isRangeSelection(selection) ||
          rootElement === null ||
          !rootElement.contains(nativeSelection.anchorNode))
      ) {
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
  return { isText, isLink, linkUrl, setShowLinkEditor, showLinkEditor };
};

export default useFloatingToolbarPlugin;
