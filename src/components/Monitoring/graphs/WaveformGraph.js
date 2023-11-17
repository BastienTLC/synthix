import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const WaveformGraph = ({ waveform }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
        }

        // Si waveform est null, crée un graphique par défaut avec des valeurs à zéro
            // Trouve la valeur maximale absolue dans les données
            const maxAbsValue = Math.max(...waveform.map(value => Math.abs(value)));

            // Ajuste le décalage pour que le zéro soit au centre du graphique
            const offset = maxAbsValue;

            const newChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Array.from({ length: waveform.length }, (_, index) => index),
                    datasets: [{
                        label: 'Waveform',
                        data: waveform.map(value => value + offset),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        fill: false,
                    }],
                },
                options: {
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            max: 256, // Valeur maximale pour l'axe des x
                        },
                        y: {
                            type: 'linear',
                            min: 0,
                            max: 1, // Valeur maximale pour l'axe des y
                        },
                    },
                    animation: false, // Désactive l'animation
                },
            });

            chartRef.current.chart = newChart;
    }, [waveform]);

    return (
        <canvas ref={chartRef} width="400" height="100"></canvas>
    );
};

export default WaveformGraph;
