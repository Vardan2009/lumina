

import { lineNumbers } from '@codemirror/view';
import { useState } from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
require('codemirror/lib/codemirror.css');

const Editor = (params) => {
  const [code,SetCode] = useState("t");
    return (
    <CodeMirror
      value={code}
      onBeforeChange={(editor, data, value) => {
        SetCode(value)
      }}
      options = {
        {
          lineNumbers:true
        }
      }
      onChange={(editor, value) => {
        console.log('controlled', {value});
      }}
    />
    );
}

export default Editor