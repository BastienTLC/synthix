import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import { Chart } from 'chart.js/auto';

const WaveformGraph = ({ waveformArrays  }) => {
    const chartRef = useRef(null);


    const data = {
        labels: Array.from({ length: waveformArrays[0].length }, (_, index) => index),
        datasets: waveformArrays.map((waveform, index) => ({
            label: `Waveform ${index + 1}`,
            data: waveform.map(value => value + Math.max(...waveform.map(value => Math.abs(value)))),
            borderColor: `rgba(${index*50}, 0, ${255-index*50}, 1)`,
            borderWidth: 1,
            fill: false,
        })),
    };

    const options = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                min: 0,
                max: 64, // Valeur maximale pour l'axe des x
                ticks: {
                    display: false, // Masque les valeurs de l'axe des y
                },
                grid: {
                    display: true, // Affiche la grille pour l'axe des y
                },
            },
            y: {
                type: 'linear',
                min: 0,
                max: 1, // Valeur maximale pour l'axe des y
                ticks: {
                    display: false, // Masque les valeurs de l'axe des y
                },
                grid: {
                    display: true, // Affiche la grille pour l'axe des y
                },
            },
        },
        plugins: {
            legend: {
                display: false, // Masque la légende
            },
        },
        animation: false, // Désactive l'animation
    }

    const style = {
        width: '400px', // Largeur fixe à 400px
        height: '200px', // Hauteur fixe à 200px
    };

    return (
        <div className={"waveform-graph"} style={style}>
            <Line ref={chartRef} data={data} options={options} />
        </div>
    );
};

export default WaveformGraph;
