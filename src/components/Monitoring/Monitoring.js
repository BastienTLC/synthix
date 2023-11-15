// Monitoring.js
import React, { useEffect, useRef } from 'react';
import { useSoundAnalysis } from '../../context/SoundAnalysisContext';
import FrequencyGraph from './graphs/FrequencyGraph';

const Monitoring = () => {
    const { soundAnalysisData, updateSoundAnalysisData } = useSoundAnalysis();
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);

    useEffect(() => {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const analyserNode = context.createAnalyser();
        analyserNode.fftSize = 2048;
        analyserNode.connect(context.destination);

        audioContextRef.current = context;
        analyserRef.current = analyserNode;

        const bufferLength = analyserNode.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const analyzeSpectrum = () => {
            analyserNode.getByteFrequencyData(dataArray);

            updateSoundAnalysisData({ frequencyData: dataArray });

            requestAnimationFrame(analyzeSpectrum);
        };

        analyzeSpectrum();
    }, [updateSoundAnalysisData]);  // Ajouter updateSoundAnalysisData comme dépendance

    return (
        <div>
            <h1>Monitoring</h1>
            {soundAnalysisData && <FrequencyGraph />}
        </div>
    );
};

export default Monitoring;
