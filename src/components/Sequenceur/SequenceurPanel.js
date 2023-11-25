// Sequencer.js
import React, {useEffect, useRef, useState} from 'react';
import Track from './Track/Track';
import Cursor from './Cursor/Cursor';
import Control from './Control/Control';
import { useSynthContext } from '../../context/SynthContext';
import './SequenceurPanel.css';


const SequencerPanel = () => {
    const [cursorPosition, setCursorPosition] = useState(-1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const { playNoteDirect } = useSynthContext();
    const [bpmValue, setBpmValue] = useState(1);
    const [noteSize, setNoteSize] = useState(100);
    const containerRef = useRef(null);

    const keyConfigurations = [
        { label: 'A4', frequency: '440'},
        { label: 'B4', frequency: '493.88'},
        { label: 'C5', frequency: '523.25'},
        { label: 'D5', frequency: '587.33'},
        { label: 'E5', frequency: '659.25'},
        { label: 'F5', frequency: '698.46'},
        { label: 'G5', frequency: '783.99'},
        { label: 'A5', frequency: '880'  },
        { label: 'B5', frequency: '987.77'},
        { label: 'C6', frequency: '1046.5'},
    ];
    const [tracks, setTracks] = useState([
        { notes: [keyConfigurations[0], keyConfigurations[2], null, keyConfigurations[4], null, keyConfigurations[7], null, keyConfigurations[9]] },
        { notes: [keyConfigurations[1], null, keyConfigurations[3], null, keyConfigurations[5], null, keyConfigurations[8], keyConfigurations[10]] },
        { notes: [null, null, keyConfigurations[2], null, null, keyConfigurations[7], null, null] },
        { notes: [keyConfigurations[4], null, keyConfigurations[6], null, keyConfigurations[9], null, keyConfigurations[0], null] },
        { notes: [null, keyConfigurations[1], null, keyConfigurations[5], null, keyConfigurations[8], null, keyConfigurations[10]] },
    ]);
    const maxTimelineLength = Math.max(...tracks.map(track => track.notes.length));



    useEffect(() => {
        if (containerRef.current) {
            setNoteSize(containerRef.current.offsetWidth / maxTimelineLength);
        }
    }, []);

    const handleNoteDrop = (draggedTimelineIndex, draggedKeyNote, targetTimelineIndex, targetKeyNote) => {
        // Copiez l'état actuel des tracks
        const newTracks = [...tracks];

        // Récupérez les notes des timelines concernées
        console.log(draggedTimelineIndex, draggedKeyNote, targetTimelineIndex, targetKeyNote);
        const draggedNotes = newTracks[draggedTimelineIndex].notes;
        const targetNotes = newTracks[targetTimelineIndex].notes;

        // Échangez les notes entre les timelines
        const draggedNote = draggedNotes[draggedKeyNote];
        const targetNote = targetNotes[targetKeyNote];

        draggedNotes[draggedKeyNote] = targetNote;
        targetNotes[targetKeyNote] = draggedNote;

        // Mettez à jour l'état avec le nouvel état
        setTracks(newTracks);
    };

    const handleCursorMove = () => {
        if (isPlaying && cursorPosition < noteSize * maxTimelineLength) {
            const newIndex = Math.floor(cursorPosition / noteSize);
            if (newIndex !== currentIndex) {
                console.log(tracks[newIndex]);
                setCurrentIndex(newIndex);

                pNote(newIndex);
            }
            setCursorPosition((prevPosition) => prevPosition + (bpmValue)*(noteSize/100));

        }
    };

    const pNote = (index) => {
        tracks.forEach((track) => {
            if (track.notes[index]) {
                playNoteDirect([track.notes[index].frequency]);
            }
        });
    };

    const startSequencer = () => {
        setIsPlaying(true);
    };

    const stopSequencer = () => {
        setIsPlaying(false);
    };

    const resetSequencer = () => {
        setCursorPosition(0);
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (event) => {
        if (isDragging) {
            setCursorPosition(event.clientX);
        }
    };

    const handleScroll = (event) => {
        if (event.deltaY < 0) {
            setNoteSize((prevNoteSize) => Math.min(prevNoteSize + 10,400));
        } else if (event.deltaY > 0) {
            setNoteSize((prevNoteSize) => Math.max (prevNoteSize - 10, 10));
        }
    };

    return (
        <div ref={containerRef} style={{cursor: isDragging ? 'grabbing' : '', }}
             className={'synth-sequence-panel'}
             onMouseMove={handleMouseMove}
             onWheel={handleScroll}>
                <Control
                    onStart={startSequencer}
                    onStop={stopSequencer}
                    onReset={resetSequencer}
                    bpmValue={bpmValue}
                    setBpmValue={setBpmValue}  />
            <div className={"timeline-container"} style={{width: `${noteSize*maxTimelineLength}px`}}>
                <Cursor
                    position={cursorPosition}
                    nbTrack={tracks.length}
                    onMove={handleCursorMove}
                    width={noteSize * tracks[0].notes.length}
                    handleMouseDown={handleMouseDown}
                    handleMouseUp={handleMouseUp}
                />
                {tracks.map((track, index) => (
                    <Track
                        key={index}
                        trackIndex={index}
                        notes={track.notes}
                        width={noteSize * maxTimelineLength}
                        height={60}
                        onNoteDrop={handleNoteDrop}
                        noteSize={noteSize}
                    />
                ))}
            </div>
        </div>
    );
};

export default SequencerPanel;
