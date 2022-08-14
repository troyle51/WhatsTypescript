import logo from './logo.svg';
import './App.css';
import  { React, useState } from 'react';
import axios from "axios";
import { TextField } from '@mui/material';
import Button from 'react-bootstrap/Button';


function App() {
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState("");

  function playAudio() {
    let audio = new Audio(data.phonetics[0].audio);
    audio.play();
  }

  function getMeaning(){
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${inputText}`
    ).then((response) => {
      setData(response.data[0]);
    });
  }


    return (
      <div className="main">
      <h1>Dictionary</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={(e) => {
            setInputText(e.target.value);
          }}
          variant="outlined"
          fullWidth
          label="Search"
        />
        <Button onClick={() => {getMeaning();}}>Find!</Button>
      </div>
      {data && (
        <div className="showResults">
          <h2>
            {data.word}{" "}
            <Button size="sm"
            variant="outline-secondary"
              onClick={() => {
                playAudio();
              }}
            >Play</Button>
          </h2>
          <h4>Parts of speech:</h4>
            <p>{data.meanings[0].partOfSpeech}{" : "}{data.phonetic}</p>
                <h4>Definition:</h4>
            <p>{data.meanings[0].definitions[0].definition}</p>
                <h4>Example:</h4>  
            <p>{data.meanings[0].definitions[0].example}</p>
        </div>
      )}
    </div>
    );
  }

  
export default App;

