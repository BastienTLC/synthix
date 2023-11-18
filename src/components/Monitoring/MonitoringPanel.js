import React, { useEffect } from 'react';
import { useNoteContext } from '../../context/NoteContext';
import WaveformGraph from './graphs/WaveformGraph';
import './MonitoringPanel.css';
import VolumeBar from "./graphs/VolumeBar";
const MonitoringPanel = () => {
    const playedNoteParams = useNoteContext();
    const volumeMax = Math.max(...playedNoteParams.playedNoteParams.analyserData.waveform.map(value => Math.abs(value)));

    useEffect(() => {

    }, [playedNoteParams]);

    return (
        <div className={"synth-monitoring-panel"}>
            <WaveformGraph waveform={playedNoteParams.playedNoteParams && playedNoteParams.playedNoteParams.analyserData.waveform} />
            <VolumeBar volume={playedNoteParams.playedNoteParams && volumeMax} />
        </div>
    );
};

export default MonitoringPanel;
