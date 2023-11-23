// Track.js
import React from 'react';
import Note from '../Note/Note';

const Track = ({ notes, height, cursorPosition }) => {
    return (
        <div style={{ display: 'flex', height: `${height}px` }}>
            {notes.map((note, index) => (
                <Note key={index} note={note} index={index}/>
            ))}
        </div>
    );
};

export default Track;
