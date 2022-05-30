import {$getRoot, $getSelection} from 'lexical';
import {useEffect} from 'react';


import LexicalComposer from '@lexical/react/LexicalComposer';
import LexicalPlainTextPlugin from '@lexical/react/LexicalPlainTextPlugin';
import LexicalContentEditable from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import LexicalOnChangePlugin from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';

import { CollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

const theme = {
    ltr: "ltr",
    rtl: "rtl",
    placeholder: "editor-placeholder",
    paragraph: "editor-paragraph"
}

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);
  });
}

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

function Editor() {
  const initialConfig = {
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <LexicalPlainTextPlugin
        contentEditable={<LexicalContentEditable />}
        placeholder={<div>Enter some text...</div>}
        initialEditorState={null}
      />
      {/* <LexicalOnChangePlugin onChange={onChange} />
      <HistoryPlugin />
      <MyCustomAutoFocusPlugin /> */}
      <CollaborationPlugin
        id="yjs-plugin"
        providerFactory={(id, yjsDocMap) => {

          const doc = new Y.Doc();
          yjsDocMap.set(id, doc);

          const provider = new WebsocketProvider(
            "ws://localhost:1234",
            id,
            doc
          );

          return provider;
        }}
        shouldBootstrap={true}
      />
    </LexicalComposer>
  );
}

export {Editor};