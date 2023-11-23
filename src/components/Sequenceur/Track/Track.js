// Track.js
import React, {useState,useEffect} from 'react';
import Note from '../Note/Note';
import './Track.css';

const Track = ({ notes, height, key }) => {
    const [draggedNote, setDraggedNote] = useState(null);

    const handleDropNote = (droppedNoteKey) => {
        // Gérer le changement de position des notes ici
        console.log(`Note ${draggedNote} dropped at position ${droppedNoteKey}`);
        setDraggedNote(null);
    };

    useEffect(() => {
        if (draggedNote !== null) console.log(draggedNote);
    }, [draggedNote]);

    return (
        <div className={'timeline-track'} style={{ height: `${height}px` }}>
            {notes.map((note, index) => (
                <Note
                    key={index}
                    note={note}
                    setDraggedNote={setDraggedNote}
                    onDropNote={handleDropNote}
                />
            ))}
        </div>
    );
};

export default Track;
