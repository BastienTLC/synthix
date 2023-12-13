// Track.js
import React from 'react';
import Note from '../Note/Note';
import './Track.css';

const Track = ({ notes, trackKeyNote, height, width, trackIndex, onNoteDrop, onSetNote, onDeleteNote, noteSize }) => {
    const handleNoteDrop = (draggedTimelineIndex, draggedKeyNote, targetKeyNote) => {
        onNoteDrop(draggedTimelineIndex, draggedKeyNote, trackIndex, targetKeyNote);
    };

    const handleSetNote = (trackIndex, keyNote) => {
        onSetNote && onSetNote(trackIndex, keyNote);
    };

    const handleDeleteNote = (trackIndex, keyNote) => {
        onDeleteNote && onDeleteNote(trackIndex, keyNote);
    }

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
                    onDeleteNote={(keyNote) => handleDeleteNote(trackIndex, keyNote)}
                    noteSize={noteSize}
                />
            ))}
        </div>
    );
};

export default Track;
