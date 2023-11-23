// Track.js
import React from 'react';
import Note from '../Note/Note';
import './Track.css';

const Track = ({ notes, height, key }) => {
    return (
        <div className={'timeline-track'} style={{height: `${height}px` }}>
            {notes.map((note, index) => (
                <Note key={index} note={note} index={index}/>
            ))}
        </div>
    );
};

export default Track;
