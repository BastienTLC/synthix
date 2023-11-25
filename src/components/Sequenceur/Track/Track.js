// Track.js
import React from 'react';
import Note from '../Note/Note';
import './Track.css';

const Track = ({ notes, height, trackIndex, onNoteDrop, noteSize }) => {
    const handleNoteDrop = (draggedTimelineIndex, draggedKeyNote, targetKeyNote) => {
        console.log(draggedTimelineIndex, draggedKeyNote, trackIndex, targetKeyNote);
        onNoteDrop(draggedTimelineIndex, draggedKeyNote, trackIndex, targetKeyNote);
    };

    return (
        <div className={'timeline-track'} style={{ height: `${height}px` }}>
            {notes.map((note, index) => (
                <Note
                    key={index}
                    keyNote={index}
                    note={note}
                    timelineIndex={trackIndex}
                    onDrop={(draggedTimelineIndex, draggedKeyNote) => handleNoteDrop(draggedTimelineIndex, draggedKeyNote, index)}
                    noteSize={noteSize}
                />
            ))}
        </div>
    );
};

export default Track;
