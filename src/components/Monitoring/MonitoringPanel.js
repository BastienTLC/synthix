import React, { useEffect, useState } from 'react';
import { useNoteContext } from '../../context/NoteContext';
import WaveformGraph from './graphs/WaveformGraph';
import './MonitoringPanel.css';
import VolumeBar from "./graphs/VolumeBar";
const MonitoringPanel = () => {
    const playedNoteParams = useNoteContext();
    const [waveformArrays, setWaveformArrays] = useState([[]]);

    // Fonction pour obtenir la fréquence maximale
    const getMaxFrequency = (waveforms) => {
        let maxFrequency = 0;

        // Parcours de tous les waveforms
        waveforms.forEach((waveform) => {
            if (waveform.length > 0) {
                const waveformMax = Math.max(...waveform);
                maxFrequency = Math.max(maxFrequency, waveformMax);
            }
        });

        return maxFrequency;
    };

    useEffect(() => {
        if (playedNoteParams.activeSynths && playedNoteParams.activeSynths.length > 0) {
            const newWaveformArrays = playedNoteParams.activeSynths
                .filter(({ waveform }) => waveform !== undefined)
                .map(({ waveform }) => Array.from(waveform));
            setWaveformArrays(newWaveformArrays);
        }
    }, [playedNoteParams]);

    // Utilisez la fonction getMaxFrequency pour obtenir la fréquence maximale
    const maxFrequency = getMaxFrequency(waveformArrays);

    return (
        <div className={"synth-monitoring-panel"}>
            <WaveformGraph waveformArrays={waveformArrays} />
            <VolumeBar volume={maxFrequency} />
        </div>
    );
};


export default MonitoringPanel;
