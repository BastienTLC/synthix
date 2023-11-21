// NoteBind.js
import React, { useRef, useEffect, useCallback} from 'react';
import { useNoteContext } from '../../context/NoteContext';
import './NoteBind.css';

const NoteBind = ({ config, keyInput, detectedInputs }) => {
    const { playNote } = useNoteContext();
    const monRef = useRef(null);

    /* -- Handlers evenements -- */
    const handleNote = useCallback(() => {
        playNote(config);
    }, [config, playNote]);

    const handleMouseDown = () => { 
        monRef.current.style.background = '#444';
        monRef.current.style.border = '1px solid #333';
    };
    
    const handleMouseUp = useCallback(() => { // on re-initialise le style.
        monRef.current.style.background = '#fff';
        monRef.current.style.border = '1px solid #333';
    }, []);
    
    useEffect(() => {
        if(detectedInputs.includes(keyInput)){
            handleMouseDown();//Utilisation du style 'souris appuyée'
            handleNote();// on joue la note
        }else{
            handleMouseUp(); //Utilisation du style 'keyInput inactive'
        }
    }, [keyInput, detectedInputs, handleMouseUp, handleNote]);
    
    return (
        <button className='synth-note-bind' ref={monRef} onClick={handleNote} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} >
            {config.label}
        </button>
    );
};

export default NoteBind;
