import React, { useEffect, useState } from 'react';
import { useSynthContext } from '../../context/SynthContext';
import WaveformGraph from './graphs/WaveformGraph';
import './MonitoringPanel.css';
import VolumeBar from "./graphs/VolumeBar";

const MonitoringPanel = () => {

    const {waveform, updateWaveform} = useSynthContext();
    const [volumeMax, setVolumeMax] = useState(0);
    
    const [data, setData] = useState({
        labels: [],
        datasets: [{
            label: 'Waveform',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false,
        }],
    }); 

    useEffect(() => {
        const intervalId = setInterval(() => {
            setVolumeMax(Math.max(...waveform.map(value => Math.abs(value))));

            /* --- on prépare les datas du graphe ici pour economiser des ressources --- */
            updateWaveform();
        
            const offset = Math.max(...waveform.map(value => Math.abs(value)));//maxAbsValue
        
            const updatedData = {
                labels: Array.from({ length: waveform.length }, (_, index) => index),
                datasets: [{
                    label: 'Waveform',
                    data: waveform.map(value => value + offset),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false,
                }],
            };
        
            setData(updatedData); 
        }, 40); // Appelle la fonction toutes les 100 millisecondes (ajuste selon tes besoins)
        return () => {
            clearInterval(intervalId);
        };
    }, [waveform, updateWaveform]);

    return (
        <div className={"synth-monitoring-panel"}>
            <WaveformGraph data={data} />
            <VolumeBar volume={volumeMax} />
        </div>
    );
};

export default MonitoringPanel;
