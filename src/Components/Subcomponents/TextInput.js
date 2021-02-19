import React, {useState} from 'react';

function TextInput({onTextChange, placeholder}) {
  const [text, setText] = useState("");
  function onChange(e) {
    const newText = e.target.value;
    setText(newText);
    onTextChange(newText);
  }
  return <input type="text" placeholder={placeholder} value={text} onChange={onChange}/>
}

export default TextInput;
