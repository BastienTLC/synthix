// Sequencer.js
import React, { useState } from 'react';
import Track from './Track/Track';
import Cursor from './Cursor/Cursor';
import Control from './Control/Control';
import { useSynthContext } from '../../context/SynthContext';
import './SequenceurPanel.css';
import { ScrollPanel } from 'primereact/scrollpanel';


const SequencerPanel = () => {
    const [cursorPosition, setCursorPosition] = useState(-1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const { playNoteDirect } = useSynthContext();
    const [bpmValue, setBpmValue] = useState(1);


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
        // Add more tracks as needed
    ]);


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
        if (isPlaying && cursorPosition < 100 * tracks[0].notes.length) {
            const newIndex = Math.floor(cursorPosition / 100);
            if (newIndex !== currentIndex) {
                console.log(tracks[newIndex]);
                setCurrentIndex(newIndex);

                pNote(newIndex);
            }
            setCursorPosition((prevPosition) => prevPosition + (bpmValue));

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

    return (
        <div style={{ width: '100%', height: '100%', cursor: isDragging ? 'grabbing' : '', }}
             handleMouseUp={handleMouseUp}
             onMouseMove={handleMouseMove}>
            <ScrollPanel style={{ width: '100%', height: '100%' }}>
                <Control
                    onStart={startSequencer}
                    onStop={stopSequencer}
                    onReset={resetSequencer}
                    bpmValue={bpmValue}
                    setBpmValue={setBpmValue}  />
                <Cursor
                    position={cursorPosition}
                    nbTrack={tracks.length}
                    onMove={handleCursorMove}
                    width={100 * tracks[0].notes.length}
                    handleMouseDown={handleMouseDown}
                    handleMouseUp={handleMouseUp}
                />
                {tracks.map((track, index) => (
                    <Track
                        key={index}
                        trackIndex={index}
                        notes={track.notes}
                        height={60}
                        onNoteDrop={handleNoteDrop}
                    />
                ))}
            </ScrollPanel>
        </div>
    );
};

export default SequencerPanel;
