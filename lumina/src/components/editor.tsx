import React, { useEffect,useRef } from 'react';
import {EditorView} from "@codemirror/view"
import { basicSetup } from 'codemirror';

const Editor = () => {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (editorRef.current) {
        const el = editorRef.current;
  
        const cmView = new EditorView({
          doc: "Hello",
          extensions: [basicSetup]
        });
  
        cmView.dom.style.height = "100%";
        el.innerHTML = "";
        el.appendChild(cmView.dom);
      }
    });
  
    return <div ref={editorRef} className='codearea'></div>;
}
export default Editor