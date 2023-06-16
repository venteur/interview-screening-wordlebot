import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const WordleBot = () => {
  const [wordInput, setWordInput] = useState(['', '', '', '', '']);
  const [clueInput, setClueInput] = useState(['', '', '', '', '']);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null);
  const [selectedColors, setSelectedColors] = useState(['', '', '', '', '']);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleWordInputChange = (index: number, value: string) => {
    const newWordInput = [...wordInput];
    newWordInput[index] = value;
    setWordInput(newWordInput);

    if (value !== '' && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    const newClueInput = [...clueInput];
    newClueInput[index] = value;
    setClueInput(newClueInput);
  };

  const handleWordInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace' && wordInput[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleClueBoxClick = (index: number, color: string) => {
    const newClueInput = [...clueInput];
    newClueInput[index] = color;
    setClueInput(newClueInput);
    setSelectedColorIndex(index);

    const newSelectedColors = [...selectedColors];
    newSelectedColors[index] = color;
    setSelectedColors(newSelectedColors);
  };

  const handleSubmit = () => {
    const request = [
      {
        word: wordInput.join(''),
        clue: clueInput.join(''),
      },
    ];

    fetch('https://interviewing.venteur.co/api/wordle', {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.guess) {
          const newWordInput = data.guess.split('');
          setWordInput(newWordInput);
          setClueInput(['', '', '', '', '']);
          setSelectedColors(['', '', '', '', '']);
          setSelectedColorIndex(null);
          if (newWordInput.every((letter: string) => letter === 'g')) {
            setCompleted(true);
          }
        } else {
          setError('Invalid response from the server.');
        }
      })
      .catch((error) => {
        setError('An error occurred while submitting the request.');
      });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Wordle Bot
      </Typography>
      <Typography variant="h6" gutterBottom>
        Guess: {wordInput.join('')}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {[0, 1, 2, 3, 4].map((index) => (
          <input
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref!)}
            type="text"
            maxLength={1}
            value={wordInput[index]}
            onChange={(e) => handleWordInputChange(index, e.target.value)}
            onKeyDown={(e) => handleWordInputKeyDown(e, index)}
            style={{
              width: '40px',
              height: '40px',
              border: '1px solid #000',
              textAlign: 'center',
              fontSize: '18px',
              lineHeight: '40px',
              marginRight: '5px',
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '5px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid #000',
                textAlign: 'center',
                fontSize: '18px',
                lineHeight: '40px',
                backgroundColor:
                  clueInput[index] === 'g' ? '#00cc00' : clueInput[index] === 'y' ? '#ffcc00' : '#ffffff',
              }}
            >
              {wordInput[index]}
            </div>
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid #000',
                backgroundColor: selectedColors[index] === 'g' ? '#00cc00' : 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => handleClueBoxClick(index, 'g')}
            />
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid #000',
                backgroundColor: selectedColors[index] === 'y' ? '#ffcc00' : 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => handleClueBoxClick(index, 'y')}
            />
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid #000',
                backgroundColor: selectedColors[index] === 'x' ? '#ffffff' : 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => handleClueBoxClick(index, 'x')}
            />
          </div>
        ))}
      </div>
      <Button variant="contained" onClick={handleSubmit} disabled={!wordInput.every((letter) => letter)}>
        Submit
      </Button>
      {completed && (
        <Typography variant="h6" style={{ color: 'green' }}>
          Congratulations! You guessed the word correctly!
        </Typography>
      )}
      {error && (
        <Typography variant="h6" style={{ color: 'red' }}>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default WordleBot;
