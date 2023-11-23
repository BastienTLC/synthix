import React, { useRef, useState, useEffect } from 'react';
import { useSynthContext } from '../../../context/SynthContext';
import { Line } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import { Chart } from 'chart.js/auto';

const WaveformGraph = ( ) => {
    const {waveform, updateWaveform} = useSynthContext();
    const chartRef = useRef(null);
    
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

    // Ajuste le décalage pour que le zéro soit au centre du graphique
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


    useEffect(() => {
        const intervalId = setInterval(() => {
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
        <div className={"waveform-graph"} style={style}> {/* idée: mettre un truc qui vérifie si le data.labels est un array car sinon il se chie dessus */} 
            <Line ref={chartRef} data={data} options={options} />
        </div>
    );
};

export default WaveformGraph;