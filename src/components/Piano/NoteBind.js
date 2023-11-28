// NoteBind.js
import React, { useRef, useEffect, useCallback} from 'react';
import { useSynthContext } from '../../context/SynthContext';
import './NoteBind.css';

const NoteBind = ({ config, keyInput, detectedInputs }) => {
    const { playNoteDirect } = useSynthContext();
    const monRef = useRef(null);

    /* -- Handlers evenements -- */
    const handleNote = useCallback(() => {
        playNoteDirect([config.frequency]);
    }, [config, playNoteDirect]);

    const handleMouseDown = useCallback(() => { 
        if(config.label.charAt(1) === '#'){
            monRef.current.style.background = '#444';
            monRef.current.style.border = '1px solid #333';
        } else {
            monRef.current.style.background = '#444';
            monRef.current.style.border = '1px solid #333';
        }
    }, [config.label]);
    
    const handleMouseUp = useCallback(() => { // on re-initialise le style.
        if(config.label.charAt(1) === '#'){
            monRef.current.style.background = '#000';
            monRef.current.style.border = '1px solid #333';
        } else {
            monRef.current.style.background = '#fff';
            monRef.current.style.border = '1px solid #333';
        }
    }, [config.label]);
    
    useEffect(() => {
        if(detectedInputs.includes(keyInput)){
            handleMouseDown();//Utilisation du style 'souris appuyée'
        }else{
            handleMouseUp(); //Utilisation du style 'keyInput inactive'
        }
    }, [keyInput, detectedInputs, handleMouseDown, handleMouseUp, handleNote]);
    
    return (
        <button className={`synth-note-bind ${config.label.charAt(1) === '#' ? 'touche-diese' : 'touche-normale'}`} ref={monRef} onClick={handleNote} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} >
            <div className="nom-note">{config.label}</div>
        </button>
    );
};

export default NoteBind;
