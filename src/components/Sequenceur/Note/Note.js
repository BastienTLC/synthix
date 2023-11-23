import React from 'react';
import { useSynthContext } from '../../../context/SynthContext';
import './Note.css';


const Note = ({note}) => {
    const { playNoteDirect } = useSynthContext();

    if (note) {
        return (

            <div className={'timeline-space'}>
                <div className={'timeline-note'}
                     onClick={() => playNoteDirect([note.frequency])}>{note.label}</div>
            </div>
        );
    } else {
        return <div className={'timeline-space'}></div>;
    }
};

export default Note;
