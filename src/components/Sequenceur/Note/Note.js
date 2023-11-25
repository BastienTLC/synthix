import React, {useRef} from 'react';
import { useSynthContext } from '../../../context/SynthContext';
import './Note.css';
import { ContextMenu } from 'primereact/contextmenu';


const Note = ({ note, keyNote, timelineIndex, onDragStart, onDragOver, onDrop, noteSize }) => {
    const { playNoteDirect } = useSynthContext();
    const cm = useRef(null);
    const items = [
        { label: 'View', icon: 'pi pi-fw pi-search' },
        { label: 'Delete', icon: 'pi pi-fw pi-trash' }
    ];

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
            <div>
                <ContextMenu model={items} ref={cm} breakpoint="767px" />
                <div
                    style={{ width: `${noteSize}px` }}
                    id={keyNote}
                    className={'timeline-note'}
                    draggable
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => playNoteDirect([note.frequency])}
                    onContextMenu={(e) => cm.current.show(e)}
                >
                    {noteSize > 20 && <span>{note.label}</span>}
                </div>
            </div>

        );
    } else {
        return <div
            style={{ width: `${noteSize}px` }}
            className={'timeline-space'}
            draggable
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        ></div>;
    }
};

export default Note;
