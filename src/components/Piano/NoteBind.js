// NoteBind.js
import React from 'react';
import * as Tone from 'tone';
import { useNoteContext } from '../../context/NoteContext';

const NoteBind = ({ config }) => {
    const { setPlayedNoteParams } = useNoteContext();

    const playNote = () => {
        const synth = new Tone.Synth(config.envelope).toDestination();
        const analyser = new Tone.Analyser('waveform', 512);
        synth.connect(analyser);

        synth.triggerAttackRelease(config.frequency, '8n');

        const intervalId = setInterval(() => {
            const waveform = analyser.getValue();

            // Filtre les valeurs différentes de zéro
            const nonZeroValues = waveform.filter(value => value !== 0);

            // Utilise la fonction de rappel du contexte pour fournir les paramètres du son
            setPlayedNoteParams({ label: config.label, frequency: config.frequency, waveform: nonZeroValues });

            // Si tu veux arrêter la transmission à un moment donné, tu peux arrêter l'intervalle
            // clearInterval(intervalId);
        }, 5); // Appelle la fonction toutes les 100 millisecondes (ajuste selon tes besoins)

        // Nettoie les ressources audio et arrête l'intervalle après un certain temps (600 millisecondes dans cet exemple)
        setTimeout(() => {
            synth.dispose();
            analyser.dispose();
            clearInterval(intervalId);
        }, 600); // Attends 600 millisecondes avant d'arrêter le son et l'intervalle
    };

    return (
        <button onClick={playNote}>
            {config.label}
        </button>
    );
};

export default NoteBind;
