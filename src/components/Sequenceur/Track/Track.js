// Track.js
import React from 'react';
import Note from '../Note/Note';
import './Track.css';

const Track = ({ notes, trackKeyNote, height, width, trackIndex, onNoteDrop, onSetNote, noteSize }) => {
    const handleNoteDrop = (draggedTimelineIndex, draggedKeyNote, targetKeyNote) => {
        console.log(draggedTimelineIndex, draggedKeyNote, trackIndex, targetKeyNote);
        onNoteDrop(draggedTimelineIndex, draggedKeyNote, trackIndex, targetKeyNote);
    };

    const handleSetNote = (trackIndex, keyNote) => {
        console.log(trackIndex, keyNote);
        onSetNote && onSetNote(trackIndex, keyNote);
    };

    return (
        <div className={'timeline-track'} style={{ height: `${height}px`, width: `${width}px` }}>
            <div className={'left-piano'} key={trackIndex}>
                <div className={'left-piano-note'}>{trackKeyNote}</div>
            </div>
            {notes.map((note, index) => (
                <Note
                    key={index}
                    keyNote={index}
                    note={trackKeyNote}
                    isPlay={note}
                    timelineIndex={trackIndex}
                    onDrop={(draggedTimelineIndex, draggedKeyNote) => handleNoteDrop(draggedTimelineIndex, draggedKeyNote, index)}
                    onSetNote={(keyNote) => handleSetNote(trackIndex, keyNote)}
                    noteSize={noteSize}
                />
            ))}
        </div>
    );
};

export default Track;
