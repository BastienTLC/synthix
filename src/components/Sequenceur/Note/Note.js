import React from 'react';
import { useSynthContext } from '../../../context/SynthContext';
import './Note.css';


const Note = ({ note, setDraggedNote, key, onDropNote }) => {
    const { playNoteDirect } = useSynthContext();

    const handleDragStart = () => {
        setDraggedNote(key);
    };

    const handleDragEnd = () => {
        setDraggedNote(null);
    };

    const handleDrop = () => {
        onDropNote && onDropNote(key);
    };

    if (note) {
        return (
            <div
                draggable={true}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrop={handleDrop}
                className={'timeline-note'}
                onClick={() => playNoteDirect([note.frequency])}
            >
                {note.label}
            </div>
        );
    } else {
        return <div className={'timeline-space'}></div>;
    }
};

export default Note;
