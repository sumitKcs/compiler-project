import { useState } from 'react';
import AceEditor from "react-ace";
import Qs from "qs";
import axios from 'axios'
import "ace-builds/src-noconflict/mode-plain_text";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import Footer from './Footer';




const App = () => {
  const [code, setCode] = useState('');
  const [lang, setLang] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('')
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('monokai');
  const [aceMode, setAceMode] = useState('plain_text');
  const [style, setStyle] = useState('darkMode');
  const [bgColor, setBgColor] = useState('black')
  const [textColor, setTextColor] = useState('white')


  const handleEditor = (newValue) => {
    setCode(newValue);
  }
  const handleLanguage = (e) => {
    setLang(e.target.value);
    setIsClicked(true);
    let m;
    if (e.target.value === "cpp") {
      m = "c_cpp";
    } else if (e.target.value === "java") {
      m = "java"
    } else if (e.target.value === "py") {
      m = "python"
    } else if (e.target.value === "js") {
      m = "javascript"
    }
    setAceMode(m)

  }
  const handleInput = (e) => {
    setInput(e.target.value);
  }
  const handleTheme = (e) => {
    if (style === "darkMode") {
      setTheme('textmate')
      setStyle("brightMode")
      setBgColor("#d6d6d6")
      setTextColor("black")
    } else {
      setTheme('monokai')
      setStyle("darkMode")
      setBgColor("black")
      setTextColor("white")
    }

  }
  const handleExecute = async () => {
    if (isClicked) {
      if (code) {
        setIsLoading(true);
        let data = Qs.stringify({
          code: code,
          language: lang,
          input: input,
        });
        const options = {
          method: 'POST',
          url: 'https://codex-api.herokuapp.com/',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",

          },
          data: data
        };
        try {
          const result = await axios.request(options);

          setOutput(result.data.error ? result.data.error : result.data.output)

        }
        catch (error) {
          setOutput(error)
          console.log(error)

        } finally {
          setIsLoading(false)

        }
      } else {
        setOutput("Please Check your code.")
      }
    } else {
      alert("Please Choose a language")
    }


  };

  const placeholder = `This compiler supports C, C++, JAVA, Python and JavaScript codes.\nYou can switch between dark and light theme using top left moon icon`;



  //let result = output.split("\n").map((output, i)=> i? [<br/>, output]: output);
  //console.log("result",result)
  return (
    <div id="container">
      <div id="topBar">
        <div id="title">
          <div id={style} onClick={handleTheme}><FontAwesomeIcon icon={solid('moon')} /></div>
          <div id="titleName">Kompiler</div>
          <div id="item3"></div>
        </div>
      </div>
      <div id="flexBoard">
        <div id="col1">
          <div id='editor'>
            <AceEditor
              mode={aceMode}
              theme={theme}
              onChange={handleEditor}
              name="editor"
              height="90vh"
              width='60vw'
              fontSize='22px'
              wrap="true"
              placeholder={placeholder}
              defaultValue=''
              setOptions={{
                autoScrollEditorIntoView: true,
                copyWithEmptySelection: true,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,

              }}

            />
          </div>
        </div>
        <div id="col2">
          <div id="language">
            <div id='lang'>
              <select name="langs" id='selectLangs' defaultValue={"default"} onChange={handleLanguage} >
                <option value="default" disabled hidden>Choose a Language</option>
                <option value="cpp">C</option>
                <option value="cpp">C++</option>
                <option value="java">JAVA</option>
                <option value="py">Python</option>
                <option value="js">JavaScript</option>
              </select>
            </div>
          </div>
          <div id="input">
            <div id="inputBox">
              <textarea style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }} placeholder="Write your inputs here...." onChange={handleInput}></textarea>
            </div>
          </div>
          <div id="run">
            <div id="run">
              <button id="runButton" onClick={handleExecute}>Execute Code{isLoading && <b>.....</b>}</button>
            </div>
          </div>
          <div id="output">
            <div id="outputBox">
              <textarea style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }} defaultValue={output} readOnly></textarea>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>


  );


}








export default App;
