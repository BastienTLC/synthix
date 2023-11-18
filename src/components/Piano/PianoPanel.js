// PianoPanel.js
import React from 'react';
import NoteBind from './NoteBind';
import { useNoteContext } from '../../context/NoteContext';
import './PianoPanel.css'

const PianoPanel = () => {
    const { playNote } = useNoteContext();

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

    const keyInputArray = [
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
    ];

    /**
     * Choppe la touche jouée et joue la note à la 
     * position correspondante dans keyConfigurations.
 
     * @param {*} e evenement "onKeyDown".
     */
    const handleNote = (e) => {
        if(keyInputArray.includes(e.key))
        playNote(keyConfigurations[keyInputArray.indexOf(e.key)]);
    };

    return (
        <div className={"synth-piano-panel"} tabIndex={0} onKeyDown={(e) => {handleNote(e)}}>
            {keyConfigurations.map((config, index) => (
                <NoteBind key={index} config={config} />
            ))}
        </div>
    );
}

export default PianoPanel;
