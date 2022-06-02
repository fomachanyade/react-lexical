import React, { FunctionComponent } from "react";

import "./App.css";
import { Editor } from "./Editor";
import { SharedHistoryContext } from "./context";
import { SettingsContext } from "./context/Settings_Context";
import { useSharedHistoryContext } from "./context";
import {
  CollaborationPlugin,
  useCollaborationContext,
} from "@lexical/react/LexicalCollaborationPlugin";
import LexicalComposer from "@lexical/react/LexicalComposer";

export type AppPropsType = {};

const App: FunctionComponent<AppPropsType> = (props) => {
  const theme = {
    ltr: "ltr",
    rtl: "rtl",
    placeholder: "editor-placeholder",
    paragraph: "editor-paragraph",
  };
  function onError(error) {
    console.error(error);
  }
  const initialConfig = {
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
      <header>
          <a href="https://lexical.dev" target="_blank" rel="noopener">
          </a>
        </header>
        <div className="editor-shell">
          <Editor />
        </div>
      </SharedHistoryContext>
    </LexicalComposer>
  );
};

export default App;
