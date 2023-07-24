import React, { useState } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import { Search, Mic, MicOff } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import './App.css';

const SearchBar = ({ value }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [searchText, setSearchText] = useState(value || '');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      console.log('Pesquisando por:', searchText);
      navigate(`/search?query=${searchText}`);
    }
  };

  const handleRecord = () => {
    if (!isRecording) {
      // Iniciar o reconhecimento de fala
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'pt-BR';

      recognition.onstart = () => {
        console.log('Gravação de voz iniciada');
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchText(transcript);
        console.log('Texto da gravação:', transcript);
      };

      recognition.onend = () => {
        setIsRecording(false);
        console.log('Gravação de voz encerrada');
      };

      recognition.start();
      setIsRecording(true);
    } else {
      // Parar o reconhecimento de fala
      window.webkitSpeechRecognition.stop();
      setIsRecording(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <TextField
        fullWidth
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyPress={handleKeyPress}
        InputProps={{
          startAdornment: (
            <IconButton style={{ color: 'dodgerblue' }} onClick={handleSearch}>
              <Search />
            </IconButton>
          ),
          endAdornment: (
            <IconButton style={{ color: 'dodgerblue' }} onClick={handleRecord}>
              {isRecording ? <MicOff /> : <Mic />}
            </IconButton>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;
