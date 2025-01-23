import { getDOMRangeRect } from "@/app/utils/getDOMRange";
import { setFloatingElemPosition } from "@/app/utils/setFloatingElemPosition";
import { $findMatchingParent, mergeRegister } from "@lexical/utils";
import { $isLinkNode, $isAutoLinkNode } from "@lexical/link";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  getDOMSelection,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { Dispatch, useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineFormatBold, MdLink } from "react-icons/md";
import FloatingLinkEditor from "./FloatingLinkEditor";
import { getSelectedNode } from "@/app/utils/getSelectedNode";

const FloatingToolbar = ({
  anchorElem,
  editor,
  setShowLinkEditor,
  showLinkEditor,
  linkUrl,
}: {
  anchorElem: HTMLElement;
  editor: LexicalEditor;
  setShowLinkEditor: Dispatch<boolean>;
  showLinkEditor: boolean;
  linkUrl: string;
}) => {
  const popupCharStylesEditorRef = useRef<HTMLDivElement | null>(null);
  const [linkEditorPosition, setLinkEditorPosition] = useState<DOMRect | null>(
    null,
  );

  const $updateTextFormatFloatingToolbar = useCallback(() => {
    const selection = $getSelection();

    const popupCharStylesEditorElem = popupCharStylesEditorRef.current;
    const nativeSelection = getDOMSelection(editor._window);

    if (popupCharStylesEditorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      nativeSelection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const rangeRect = getDOMRangeRect(nativeSelection, rootElement);
      setFloatingElemPosition(rangeRect, popupCharStylesEditorElem, anchorElem);
      const linkEditorPosition =
        popupCharStylesEditorElem.getBoundingClientRect();
      setLinkEditorPosition(linkEditorPosition);
    }
  }, [editor, anchorElem]);

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement;

    const update = () => {
      editor.getEditorState().read(() => {
        $updateTextFormatFloatingToolbar();
      });
    };

    window.addEventListener("resize", update);
    if (scrollerElem) {
      scrollerElem.addEventListener("scroll", update);
    }

    return () => {
      window.removeEventListener("resize", update);
      if (scrollerElem) {
        scrollerElem.removeEventListener("scroll", update);
      }
    };
  }, [editor, $updateTextFormatFloatingToolbar, anchorElem]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      $updateTextFormatFloatingToolbar();
    });
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateTextFormatFloatingToolbar();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateTextFormatFloatingToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, $updateTextFormatFloatingToolbar]);

  return (
    <>
      <div
        ref={popupCharStylesEditorRef}
        className="FloatingToolbarPlugin shadow-lg rounded-sm p-3 border border-gray-100 absolute z-30 bg-white top-0 left-0 opacity-0"
      >
        <div className="flex gap-3 items-center">
          <button
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
          >
            <MdOutlineFormatBold />
          </button>
          <button onClick={() => setShowLinkEditor(true)}>
            <MdLink />
          </button>
        </div>
      </div>
      {showLinkEditor ? (
        <FloatingLinkEditor
          rect={linkEditorPosition}
          setShowLinkEditor={setShowLinkEditor}
          linkUrl={linkUrl}
        />
      ) : null}
    </>
  );
};

export default FloatingToolbar;
