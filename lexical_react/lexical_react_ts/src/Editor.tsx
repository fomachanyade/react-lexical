import React, { FunctionComponent, useEffect } from "react";
import { $getRoot, $getSelection, EditorState } from "lexical";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import {
  CollaborationPlugin,
} from "@lexical/react/LexicalCollaborationPlugin";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import{ ContentEditable }from "@lexical/react/LexicalContentEditable";

import { createWebsocketProvider } from "./collaboration";
import { SharedHistoryContext, useSharedHistoryContext } from "./context";

const skipCollaborationInit =
  // @ts-ignore
  window.parent != null && window.parent.frames.right === window;

function onChange(editorState: EditorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    // console.log(root, selection);
  });
}

function Editor() {
  const { historyState } = useSharedHistoryContext();

  const isCollab = true;

  return (
    <div className="editor-container">
      {isCollab ? (
        <CollaborationPlugin
          id="main"
          providerFactory={createWebsocketProvider}
          shouldBootstrap={!skipCollaborationInit}
          username='高谷誉27歳独身'
        />
      ) : (
        <HistoryPlugin externalHistoryState={historyState} />
      )}
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-input" />}
        placeholder={<div>type here</div>}
        initialEditorState={null}
      />
    </div>
  );
}

export { Editor };
