

import { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { createTheme } from '@uiw/codemirror-themes';

// THEMES
import { materialDark } from '@uiw/codemirror-theme-material';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';

import { tags as t } from '@lezer/highlight';
import Sidebar from './sidebar'
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import {getClassWithColor} from 'file-icons-js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

require('codemirror/lib/codemirror.css');



const getLangNameByExtension = (extension) => {
  const extensionMap = {
      '.apl': 'apl',
      '.asc': 'asciiArmor',
      '.asterisk': 'asterisk',
      '.c': 'c',
      '.cs': 'csharp',
      '.scala': 'scala',
      '.sol': 'solidity',
      '.kt': 'kotlin',
      '.shader': 'shader',
      '.nc': 'nesC',
      '.m': 'objectiveC',
      '.mm': 'objectiveCpp',
      '.nut': 'squirrel',
      '.ceylon': 'ceylon',
      '.dart': 'dart',
      '.cmake': 'cmake',
      '.cob': 'cobol',
      '.lisp': 'commonLisp',
      '.cr': 'crystal',
      '.cyp': 'cypher',
      '.d': 'd',
      '.diff': 'diff',
      '.dtd': 'dtd',
      '.dylan': 'dylan',
      '.ebnf': 'ebnf',
      '.ecl': 'ecl',
      '.e': 'eiffel',
      '.elm': 'elm',
      '.factor': 'factor',
      '.fcl': 'fcl',
      '.fs': 'forth',
      '.f90': 'fortran',
      '.s': 'gas',
      '.feature': 'gherkin',
      '.groovy': 'groovy',
      '.hs': 'haskell',
      '.hx': 'haxe',
      '.http': 'http',
      '.idl': 'idl',
      '.j2': 'jinja2',
      '.m': 'mathematica',
      '.mbox': 'mbox',
      '.mrc': 'mirc',
      '.mo': 'modelica',
      '.msc': 'mscgen',
      '.mps': 'mumps',
      '.nsi': 'nsis',
      '.nt': 'ntriples',
      '.m': 'octave',
      '.oz': 'oz',
      '.pig': 'pig',
      '.properties': 'properties',
      '.proto': 'protobuf',
      '.pp': 'puppet',
      '.q': 'q',
      '.sas': 'sas',
      '.sass': 'sass',
      '.liquid': 'liquid',
      '.mermaid': 'mermaid',
      '.nix': 'nix',
      '.svelte': 'svelte',
      '.sieve': 'sieve',
      '.st': 'smalltalk',
      '.solr': 'solr',
      '.rq': 'sparql',
      '.sps': 'spreadsheet',
      '.stex': 'stex',
      '.textile': 'textile',
      '.tid': 'tiddlyWiki',
      '.tiki': 'tiki',
      '.tr': 'troff',
      '.ttcn': 'ttcn',
      '.ttl': 'turtle',
      '.vm': 'velocity',
      '.v': 'verilog',
      '.vhd': 'vhdl',
      '.webidl': 'webIDL',
      '.xq': 'xQuery',
      '.ys': 'yacas',
      '.z80': 'z80',
      '.wast': 'wast',
      '.js': 'javascript',
      '.jsx': 'jsx',
      '.ts': 'typescript',
      '.tsx': 'tsx',
      '.vue': 'vue',
      '.json': 'json',
      '.html': 'html',
      '.css': 'css',
      '.py': 'python',
      '.md': 'markdown',
      '.xml': 'xml',
      '.sql': 'sql',
      '.mysql': 'mysql',
      '.pgsql': 'pgsql',
      '.java': 'java',
      '.rs': 'rust',
      '.cpp': 'cpp',
      '.lezer': 'lezer',
      '.php': 'php',
      '.go': 'go',
      '.sh': 'shell',
      '.lua': 'lua',
      '.swift': 'swift',
      '.tcl': 'tcl',
      '.yaml': 'yaml',
      '.vb': 'vb',
      '.ps1': 'powershell',
      '.bf': 'brainfuck',
      '.styl': 'stylus',
      '.erl': 'erlang',
      '.nginx': 'nginx',
      '.pl': 'perl',
      '.rb': 'ruby',
      '.pas': 'pascal',
      '.ls': 'livescript',
      '.less': 'less',
      '.scm': 'scheme',
      '.toml': 'toml',
      '.vbs': 'vbscript',
      '.clj': 'clojure',
      '.coffee': 'coffeescript',
      '.jl': 'julia',
      '.Dockerfile': 'dockerfile',
      '.r': 'r'
  };
  
  if (extensionMap.hasOwnProperty("." + extension.toLowerCase())) {
  return extensionMap["."+extension.toLowerCase()];
  }
  else
  {
    return 'No Syntax Highlighting found';
  }
}


const startCodes = [
  {
    code:"// Why did the JavaScript developer go broke? Because he kept spending all his cash on \"promises\" that never resolved!",
  },
  {
    code:"# How does a Python programmer solve a problem? They slither through it!",
  },
  {
    code:"// Why did the JavaScript developer quit his job? Because he couldn't handle the \"callback\" from his boss!",
  },
  {
    code:"# Why did the Python developer get lost? Because his map function didn't return a value!",
  }
] 


const Editor = (params) => {
  const [code,SetCode] = useState("// Hello Lumina!");
  const [path,SetPath] = useState("new.js");
  const [saved,SetSaved] = useState(false);

  useEffect(()=>{
    let randindex = Math.floor(Math.random()*startCodes.length)
    SetCode(startCodes[randindex].code)
    SetPath(undefined)

  },[])

  const loadFile = (path)=>{
    params.functions.readFile(SetCode,path);
    params.SetCurrentPath(path)
    params.SetCurrentCode(code)
    SetPath(path)
  }

  let lang = getLangNameByExtension
        (
          path?path.split('.').pop():"."
        );
  
   useEffect(()=>{
    if(!path) return;
    if(!code) return;
    SetSaved(params.electron.checkIfSaved(path,code))
   },[path,code])
    
   useEffect(()=>{
    if(!params.electron) return;
    params.electron.onSave(()=>{SetSaved(true)})
   },[params.electron])

  return (
      <>
      <Sidebar electron={params.electron} functions={params.functions} dirtree={params.dirtree} SetCode={loadFile} projpath={params.projpath}/>
      <div style={{width:"100%"}}>

      <div style={{display:"flex",alignItems:"center"}}>
        <p style={{margin:"0px 20px"}}><span className={getClassWithColor(path)}></span> {path?path.split('\\').pop():"Untitled"} {!saved&&"(unsaved)"} | {lang}</p>
        <button className='smallbtn' onClick={()=>{params.electron.showInExplorer(path)}}> <FontAwesomeIcon icon={faFolderOpen} /> </button>
      </div>

      <CodeMirror
      value={code}
      extensions={lang!='No Syntax Highlighting found'?[
        loadLanguage(
          lang
        )
      ]:[]}
      onChange={(newcode) => {
        SetCode(newcode)
        params.SetCurrentCode(newcode)
      }}
      theme={tokyoNight}
      width='100%'
      height='calc(100vh - 60px)'
    />
    </div>
    </>
    );
}

export default Editor