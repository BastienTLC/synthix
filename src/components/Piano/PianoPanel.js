// PianoPanel.js
import React , {useState, useMemo} from 'react';
import { useSynthContext } from '../../context/SynthContext';
import NoteBind from './NoteBind';
import './PianoPanel.css';

const PianoPanel = () => {
    const [keysPressed, setKeysPressed] = useState([]);
    const [frequenciesPlayed, setFrequenciesPlayed] = useState([]);
    const { playNoteDirect } = useSynthContext();
    
    const keyInputArray = useMemo( () => [ //optimisation des rafraichissements 
        'w',
          's', //#
        'x',
          'd', //#
        'c',
        'v',
          'g', //#
        'b',
          'h', //#
        'n',
          'j', //#
        ',',
        'a',
          'é', //#
        'z',
          '"', //#
        'e',
        'r',
          '(', //#
        't',
          '§', //#
        'y',
          'è', //#
        'u',
        'i',
          'ç', //#
        'o',
          'à', //#
        'p'
    ], []);

    const keyConfigurations = [
      {"label": "C3", "frequency": "130.81"},
      {"label": "C#3", "frequency": "138.59"},
      {"label": "D3", "frequency": "146.83"},
      {"label": "D#3", "frequency": "155.56"},
      {"label": "E3", "frequency": "164.81"},
      {"label": "F3", "frequency": "174.61"},
      {"label": "F#3", "frequency": "185"},
      {"label": "G3", "frequency": "196"},
      {"label": "G#3", "frequency": "207.65"},
      {"label": "A3", "frequency": "220"},
      {"label": "A#3", "frequency": "233.08"},
      {"label": "B3", "frequency": "246.94"},
      {"label": "C4", "frequency": "261.63"},
      {"label": "C#4", "frequency": "277.18"},
      {"label": "D4", "frequency": "293.66"},
      {"label": "D#4", "frequency": "311.13"},
      {"label": "E4", "frequency": "329.63"},
      {"label": "F4", "frequency": "349.23"},
      {"label": "F#4", "frequency": "369.99"},
      {"label": "G4", "frequency": "392"},
      {"label": "G#4", "frequency": "415.30"},
      {"label": "A4", "frequency": "440"},
      {"label": "A#4", "frequency": "466.16"},
      {"label": "B4", "frequency": "493.88"},
      {"label": "C5", "frequency": "523.25"},
      {"label": "C#5", "frequency": "554.37"},
      {"label": "D5", "frequency": "587.33"},
      {"label": "D#5", "frequency": "622.25"},
      {"label": "E5", "frequency": "659.25"} 
    ];
    
    const handleKeyDown = (event) => {
      // Vérif si la touche appuyée n'est pas déjà dans le tableau.
      const freqCourante = keyConfigurations[keyInputArray.indexOf(event.key)]?.frequency;
      if (
        !frequenciesPlayed.includes(freqCourante) &&
        keyInputArray.includes(event.key)
      ) {
        setKeysPressed([...keysPressed, event.key]);
        setFrequenciesPlayed((prevFrequenciesPlayed) => {
          playNoteDirect([...prevFrequenciesPlayed, freqCourante]);
          return [...prevFrequenciesPlayed, freqCourante];
        });
      }
    };
    const handleKeyUp = (event) => {
      // touche relâchée: on l'enlève du tableau
      setFrequenciesPlayed(frequenciesPlayed.filter((freq) => freq !== keyConfigurations[keyInputArray.indexOf(event.key)]?.frequency)); // retirer la touche appuyée du tableau
      setKeysPressed(keysPressed.filter((key) => key !== event.key));
    };

    return ( 
        <div className={"synth-piano-panel"} tabIndex={0} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} >
            {keyConfigurations.map((config, index) => (
                <div className="NoteConteneur">
                  <NoteBind key={index} config={config} keyInput={keyInputArray[index]} detectedInputs={keysPressed} />
                </div>
            ))}
        </div>
    );
}

export default PianoPanel;
