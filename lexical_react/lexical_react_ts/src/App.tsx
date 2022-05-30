import React, { FunctionComponent } from "react";

import "./App.css";
import { Editor } from "./Editor";
import { SharedHistoryContext } from "./context";
import { SettingsContext } from "./context/Settings_Context";

export type AppPropsType = {};

const App: FunctionComponent<AppPropsType> = (props) => {
  return (
    <div>
      <SettingsContext>
        <Editor />
      </SettingsContext>
    </div>
  );
};

export default App;
