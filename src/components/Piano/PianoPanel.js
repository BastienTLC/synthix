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
        'a',
        'z',
        'e',
        'r',
        't',
        'y',
        'u',
        'i',
        'o',
        'p'
    ], []);

    const keyConfigurations = [
        { label: 'A4', frequency: '440'  },
        { label: 'B4', frequency: '493.88'},
        { label: 'C5', frequency: '523.25'},
        { label: 'D5', frequency: '587.33'},
        { label: 'E5', frequency: '659.25'},
        { label: 'F5', frequency: '698.46'},
        { label: 'G5', frequency: '783.99'},
        { label: 'A5', frequency: '880'  },
        { label: 'B5', frequency: '987.77'},
        { label: 'C6', frequency: '1046.5'},
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
                <NoteBind key={index} config={config} keyInput={keyInputArray[index]} detectedInputs={keysPressed} />
            ))}
        </div>
    );
}

export default PianoPanel;
