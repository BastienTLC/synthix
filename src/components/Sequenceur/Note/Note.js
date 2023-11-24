import React from 'react';
import { useSynthContext } from '../../../context/SynthContext';
import './Note.css';


const Note = ({ note, keyNote, timelineIndex, onDragStart, onDragOver, onDrop }) => {
    const { playNoteDirect } = useSynthContext();

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({ keyNote, timelineIndex }));
        onDragStart && onDragStart(e);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        onDragOver && onDragOver(e);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const draggedData = JSON.parse(e.dataTransfer.getData('text/plain'));
        const draggedKeyNote = draggedData.keyNote;
        const draggedTimelineIndex = draggedData.timelineIndex;
        console.log(draggedTimelineIndex, draggedKeyNote, timelineIndex, keyNote);
        onDrop && onDrop(draggedTimelineIndex, draggedKeyNote, timelineIndex, keyNote);
    };

    if (note) {
        return (
            <div
                id={keyNote}
                className={'timeline-note'}
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => playNoteDirect([note.frequency])}
            >
                {note.label}
            </div>
        );
    } else {
        return <div
            className={'timeline-space'}
            draggable
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        ></div>;
    }
};

export default Note;
