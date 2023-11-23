import React, { useEffect, useState } from 'react';
import { useSynthContext } from '../../context/SynthContext';
import WaveformGraph from './graphs/WaveformGraph';
import './MonitoringPanel.css';
import VolumeBar from "./graphs/VolumeBar";

const MonitoringPanel = () => {

    const {waveform} = useSynthContext();
    const [volumeMax, setVolumeMax] = useState(0);
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            setVolumeMax(Math.max(...waveform.map(value => Math.abs(value))));
        }, 40); // Appelle la fonction toutes les 100 millisecondes (ajuste selon tes besoins)
        return () => {
            clearInterval(intervalId);
        };
    }, [waveform]);

    // Utilisez la fonction getMaxFrequency pour obtenir la fréquence maximale
    const maxFrequency = getMaxFrequency(waveformArrays);

    return (
        <div className={"synth-monitoring-panel"}>
            <WaveformGraph />
            <VolumeBar volume={volumeMax} />
        </div>
    );
};

export default MonitoringPanel;
