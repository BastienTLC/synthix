import React, {useState, useEffect} from 'react';
import { Button } from 'primereact/button';
import './Control.css';
import { Knob } from 'primereact/knob';

const Control = ({ onStart, onStop, onReset, setBpmValue, bpmValue }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);

    const toggleSequencer = () => {
        if (isPlaying) {
            onStop();
            setElapsedTime(Date.now() - startTime);
        } else {
            onStart();
            setStartTime(Date.now());
        }
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    };
    const resetSequencer = () =>{
        toggleSequencer();
        onReset();
        setElapsedTime(0);
    }

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isPlaying, startTime]);

    return (
        <div className={"timeline-control"}>
            <Button icon={isPlaying ? "pi pi-play" : "pi pi-pause"} rounded text raised aria-label="Filter" onClick={toggleSequencer}/>
            <Button icon="pi pi-refresh" rounded text raised aria-label="Filter" onClick={resetSequencer}/>
            <Button icon="pi pi-circle-fill" rounded text raised aria-label="Filter"/>
            <Knob value={bpmValue} onChange={(e) => setBpmValue(e.value)} min={-10} max={10} />
            <div className={"play-duration"}>{elapsedTime*bpmValue / 1000}s</div>
        </div>
    );
};

export default Control;

