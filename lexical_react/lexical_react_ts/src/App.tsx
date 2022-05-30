import React, { FunctionComponent } from 'react';

import './App.css';
import { Editor } from './Editor';

export type AppPropsType = {};

const App :FunctionComponent<AppPropsType>= (props) =>  {
  return <div>
    <Editor />
  </div>
};

export default App;
