// Sequencer.js
import React, {useEffect, useRef, useState} from 'react';
import Track from './Track/Track';
import Cursor from './Cursor/Cursor';
import Control from './Control/Control';
import { useSynthContext } from '../../context/SynthContext';
import './SequenceurPanel.css';


const SequencerPanel = () => {
    const [cursorPosition, setCursorPosition] = useState(39);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const { playNoteDirect, playCustomNote } = useSynthContext();
    const [bpmValue, setBpmValue] = useState(6);
    const [config, setConfig] = useState(null);
    const [noteSize, setNoteSize] = useState(100);
    const containerRef = useRef(null);


    const generateZeroArray = (length) => {
        return Array.from({ length }, () => 0);
    };

    const [tracks, setTracks] = useState([
        { note: "C3", track: generateZeroArray(32) },
        { note: "C#3", track: generateZeroArray(32) },
        { note: "D3", track: generateZeroArray(32) },
        { note: "D#3", track: generateZeroArray(32) },
        { note: "E3", track: generateZeroArray(32) },
        { note: "F3", track: generateZeroArray(32) },
        { note: "F#3", track: generateZeroArray(32) },
        { note: "G3", track: generateZeroArray(32) },
        { note: "G#3", track: generateZeroArray(32) },
        { note: "A3", track: generateZeroArray(32) },
        { note: "A#3", track: generateZeroArray(32) },
        { note: "B3", track: generateZeroArray(32) },
        { note: "C4", track: generateZeroArray(32) },
        { note: "C#4", track: generateZeroArray(32) },
        { note: "D4", track: generateZeroArray(32) },
        { note: "D#4", track: generateZeroArray(32) },
        { note: "E4", track: generateZeroArray(32) },
        { note: "F4", track: generateZeroArray(32) },
        { note: "F#4", track: generateZeroArray(32) },
        { note: "G4", track: generateZeroArray(32) },
        { note: "G#4", track: generateZeroArray(32) },
        { note: "A4", track: generateZeroArray(32) },
        { note: "A#4", track: generateZeroArray(32) },
        { note: "B4", track: generateZeroArray(32) },
        { note: "C5", track: generateZeroArray(32) },
        { note: "C#5", track: generateZeroArray(32) },
        { note: "D5", track: generateZeroArray(32) },
        { note: "D#5", track: generateZeroArray(32) },
        { note: "E5", track: generateZeroArray(32) },
    ]);
    const maxTimelineLength = Math.max(...tracks.map(track => track.track.length));



    useEffect(() => {
        if (containerRef.current) {
            setNoteSize((containerRef.current.offsetWidth - 40) / maxTimelineLength);
        }
    }, [maxTimelineLength]);

    const handleNoteDrop = (draggedTimelineIndex, draggedKeyNote, targetTimelineIndex, targetKeyNote) => {
        // Copiez l'état actuel des tracks
        const newTracks = [...tracks];

        // Récupérez les notes des timelines concernées
        const draggedNotes = newTracks[draggedTimelineIndex].track;
        const targetNotes = newTracks[targetTimelineIndex].track;

        // Échangez les notes entre les timelines
        const draggedNote = draggedNotes[draggedKeyNote];
        const targetNote = targetNotes[targetKeyNote];

        draggedNotes[draggedKeyNote] = targetNote;
        targetNotes[targetKeyNote] = draggedNote;

        // Mettez à jour l'état avec le nouvel état
        setTracks(newTracks);
    };

    const handleSetNote = (trackIndex, keyNote) => {
        // Copiez l'état actuel des tracks
        if (config){
            const newTracks = [...tracks];
            newTracks[trackIndex].track[keyNote] = config;
            setTracks(newTracks);
            playCustomNote(tracks[trackIndex].note, config);
        }
        else{
            const newTracks = [...tracks];
            newTracks[trackIndex].track[keyNote] = 1;
            setTracks(newTracks);
            playNoteDirect(tracks[trackIndex].note);
        }
    };

    const handleDeleteNote = (trackIndex, keyNote) => {
        const newTracks = [...tracks];
        newTracks[trackIndex].track[keyNote] = 0;
        setTracks(newTracks);

    };

    const handleCursorMove = () => {
        if (isPlaying && cursorPosition < noteSize * maxTimelineLength + 40) {//nombre de notes * taille d'une note - piano
            const newIndex = Math.floor(cursorPosition / noteSize);
            if (newIndex !== currentIndex) {
                setCurrentIndex(newIndex);
                pNote(newIndex);
            }
            setCursorPosition((prevPosition) => prevPosition + (bpmValue)*(noteSize/100));

        }
    };

    const pNote = (index) => {
        tracks.forEach((track) => {
            if (track.track[index]) {
                if (track.track[index] !== 1){
                    playCustomNote(track.note, track.track[index]);
                }
                playNoteDirect(track.note);
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
        setCursorPosition(39);
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    } ;

    const handleMouseMove = (event) => {
        if (isDragging) {
            setCursorPosition(event.clientX);
        }
    };

    const handleScroll = (event) => {
        if (event.shiftKey) {
            if (event.deltaY < 0) {
                setNoteSize((prevNoteSize) => Math.min(prevNoteSize + 10,400));
            } else if (event.deltaY > 0) {
                setNoteSize((prevNoteSize) => Math.max (prevNoteSize - 10, 10));
            }
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
                    setBpmValue={setBpmValue}
                    setConfig={setConfig}
                />
            <div className={"timeline-container"} style={{width: `${noteSize*maxTimelineLength}px`}}>
                <Cursor
                    position={cursorPosition}
                    nbTrack={tracks.length}
                    onMove={handleCursorMove}
                    width={noteSize * maxTimelineLength}
                    handleMouseDown={handleMouseDown}
                    handleMouseUp={handleMouseUp}
                />
                {tracks.map((track, index) => (
                    <Track
                        key={index}//0
                        trackIndex={index}//0
                        trackKeyNote={track.note}//"A4"
                        notes={track.track}//[true, null, null, true, null]
                        width={noteSize * maxTimelineLength}//nombre de notes * taille d'une note - piano
                        height={30}
                        onNoteDrop={handleNoteDrop}//(draggedTimelineIndex, draggedKeyNote, targetTimelineIndex, targetKeyNote)
                        noteSize={noteSize}//taille de la note en px
                        isPlaying={isPlaying}
                        onSetNote={handleSetNote}
                        onDeleteNote={handleDeleteNote}
                    />
                ))}
            </div>
        </div>
    );
};

export default SequencerPanel;
