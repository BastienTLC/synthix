// FrequencyGraph.js
import React, { useEffect, useRef } from 'react';
import { useSoundAnalysis } from '../../../context/SoundAnalysisContext';

const FrequencyGraph = () => {
    const { soundAnalysisData } = useSoundAnalysis();
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (!soundAnalysisData || !soundAnalysisData.frequencyData) {
            return;
        }

        const bufferLength = soundAnalysisData.frequencyData.length;
        const dataArray = soundAnalysisData.frequencyData;

        // Efface le canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dessine le graphique de fréquence en temps réel
        ctx.beginPath();
        const sliceWidth = (canvas.width * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const value = dataArray[i];
            const y = (value / 255) * canvas.height;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        ctx.strokeStyle = 'rgba(75, 192, 192, 1)';
        ctx.lineWidth = 2;
        ctx.stroke();
    }, [soundAnalysisData]);

    return <canvas ref={canvasRef} width="400" height="200" />;
};

export default FrequencyGraph;
