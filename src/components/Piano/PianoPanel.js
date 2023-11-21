// PianoPanel.js
import React , {useEffect, useState, useMemo} from 'react';
import NoteBind from './NoteBind';
import './PianoPanel.css';

const PianoPanel = () => {
    const [keysPressed, setKeysPressed] = useState([]);
    
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
        { label: 'A4', frequency: '440', envelope: { attack: 0.05, decay: 0.1, sustain: 0.3, release: 0.5 } },
        { label: 'B4', frequency: '493.88', envelope: { attack: 0.05, decay: 0.1, sustain: 0.4, release: 0.6 } },
        { label: 'C5', frequency: '523.25', envelope: { attack: 0.05, decay: 0.1, sustain: 0.5, release: 0.7 } },
        { label: 'D5', frequency: '587.33', envelope: { attack: 0.05, decay: 0.1, sustain: 0.6, release: 0.8 } },
        { label: 'E5', frequency: '659.25', envelope: { attack: 0.05, decay: 0.1, sustain: 0.7, release: 0.9 } },
        { label: 'F5', frequency: '698.46', envelope: { attack: 0.05, decay: 0.1, sustain: 0.8, release: 1.0 } },
        { label: 'G5', frequency: '783.99', envelope: { attack: 0.05, decay: 0.1, sustain: 0.9, release: 1.2 } },
        { label: 'A5', frequency: '880', envelope: { attack: 0.05, decay: 0.1, sustain: 1.0, release: 1.5 } },
        { label: 'B5', frequency: '987.77', envelope: { attack: 0.05, decay: 0.1, sustain: 1.2, release: 1.8 } },
        { label: 'C6', frequency: '1046.5', envelope: { attack: 0.05, decay: 0.1, sustain: 1.5, release: 2.0 } },
    ];

    useEffect(() => {
      const handleKeyDown = (event) => {
        // Vérif si la touche appuyée n'est pas déjà dans le tableau.
        if (!keysPressed.includes(event.key) && keyInputArray.includes(event.key)) {
          setKeysPressed([...keysPressed, event.key]); // Ajouter la touche appuyée au tableau
        }
      };
      const handleKeyUp = (event) => {
        // touche relâchée: on l'enlève du tableau
        setKeysPressed(keysPressed.filter((key) => key !== event.key));
      };
  
      // Écouter les événements de clavier au niveau de la fenêtre
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }, [keysPressed, keyInputArray]);

    return (
        <div className={"synth-piano-panel"} tabIndex={0} >
            {keyConfigurations.map((config, index) => (
                <NoteBind key={index} config={config} keyInput={keyInputArray[index]} detectedInputs={keysPressed} />
            ))}
        </div>
    );
}

export default PianoPanel;
