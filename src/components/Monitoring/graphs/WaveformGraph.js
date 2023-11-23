import React from 'react';
import { Line } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import { Chart } from 'chart.js/auto';

const WaveformGraph = ( {data} ) => {
   
    const style = {
        width: '400px', // Largeur fixe à 400px
        height: '200px', // Hauteur fixe à 200px
    };

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
    
    return (
        <div className={"waveform-graph"} style={style}> {/* idée: mettre un truc qui vérifie si le data.labels est un array car sinon il se chie dessus */} 
            <Line data={data} options={options} />
        </div>
    );
};

export default WaveformGraph;