// NoteBind.js
import React from 'react';
import { useNoteContext } from '../../context/NoteContext';

const NoteBind = ({ config }) => {
    const { playNote } = useNoteContext();

    const handleNote = () => {
        playNote(config);
    }

    return (
        <button onClick={handleNote}>
            {config.label}
        </button>
    );
};

export default NoteBind;
