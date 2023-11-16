// NoteBind.js
import React from 'react';
import * as Tone from 'tone';
import { useNoteContext } from '../../context/NoteContext';

const NoteBind = ({ config }) => {
    const { handleNotePlay } = useNoteContext();

    const playNote = () => {
        const synth = new Tone.Synth(config.envelope).toDestination();
        const analyser = new Tone.Analyser('waveform', 1024);
        synth.connect(analyser);

        synth.triggerAttackRelease(config.frequency, '8n');

        // Attends un court instant avant de récupérer les données de la forme d'onde
        setTimeout(() => {
            const waveform = analyser.getValue();

            // Filtre les valeurs différentes de zéro
            const nonZeroValues = waveform.filter(value => value !== 0);

            // Utilise la fonction de rappel du contexte pour fournir les paramètres du son
            handleNotePlay({ label: config.label, frequency: config.frequency, waveform: nonZeroValues });

            // Affiche les valeurs différentes de zéro dans la console
            console.log('Non-zero Waveform:', nonZeroValues);

            // Nettoie les ressources audio
            synth.dispose();
            analyser.dispose();
        }, 200); // Attends 200 millisecondes (ajuste selon tes besoins)
    };

    return (
        <button onClick={playNote}>
            {config.label}
        </button>
    );
};

export default NoteBind;
