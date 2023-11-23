// Sequencer.js
import React, { useState } from 'react';
import Track from './Track/Track';
import Cursor from './Cursor/Cursor';
import Control from './Control/Control';
import { useSynthContext } from '../../context/SynthContext';


const SequencerPanel = () => {
    const [cursorPosition, setCursorPosition] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const { playNoteDirect } = useSynthContext();

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

    const tracks = [
        { notes: [null, null, null, keyConfigurations[0]] },
        { notes: [null, keyConfigurations[0], null, null] },
        // Add more tracks as needed
    ];

    const handleCursorMove = () => {
        if (isPlaying && cursorPosition < 100 * tracks[0].notes.length) {
            const newIndex = Math.floor(cursorPosition / 100);
            if (newIndex !== currentIndex) {
                console.log(tracks[newIndex]);
                setCurrentIndex(newIndex);

                pNote(newIndex);
            }
            setCursorPosition((prevPosition) => prevPosition + 1);

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

    return (
        <div style={{height: "500px", width:"800px"}}>
            <Control onStart={startSequencer} onStop={stopSequencer} onReset={resetSequencer} />
            <Cursor position={cursorPosition} nbTrack={tracks.length} onMove={handleCursorMove} width={100*tracks[0].notes.length} />
            {tracks.map((track, index) => (
                <Track key={index} notes={track.notes} height={60} width={100*track.notes.length} cursorPosition={cursorPosition}  />
            ))}

        </div>
    );
};

export default SequencerPanel;
