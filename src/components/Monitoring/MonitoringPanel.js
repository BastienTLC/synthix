import React, { useEffect } from 'react';
import { useNoteContext } from '../../context/NoteContext';
import WaveformGraph from './graphs/WaveformGraph';
import './MonitoringPanel.css';
const MonitoringPanel = () => {
    const playedNoteParams = useNoteContext();

    useEffect(() => {

    }, [playedNoteParams]);

    return (
        <div className={"synth-monitoring-panel"}>
            {/* Affiche le graphique de la waveform */}
            <WaveformGraph waveform={playedNoteParams.playedNoteParams && playedNoteParams.playedNoteParams.waveform} />
        </div>
    );
};

export default MonitoringPanel;
