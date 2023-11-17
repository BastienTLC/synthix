import React, { createContext, useContext, useState } from 'react';
import * as Tone from 'tone';

const NoteContext = createContext(); 

/**
 * Definition du provider avec 
 * @param {children}  
 * @returns 
 */
export const NoteProvider = ({ children }) => {
    const [playedNoteParams, setPlayedNoteParams] = useState({ label: 'C4', frequency: '100.63', envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 1 }, waveform: Array(0) });

    const playNote = (config) => {
        const soundDuration = config.envelope.release;
        const synth = new Tone.Synth(config.envelope).toDestination();
        const analyser = new Tone.Analyser('waveform', 256);
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
        }, 30); // Appelle la fonction toutes les 100 millisecondes (ajuste selon tes besoins)

        // Nettoie les ressources audio et arrête l'intervalle après un certain temps (600 millisecondes dans cet exemple)
        setTimeout(() => {
            synth.dispose();
            analyser.dispose();
            clearInterval(intervalId);
        }, 1000*soundDuration); // Attends 600 millisecondes avant d'arrêter le son et l'intervalle
    };

    return (
        <NoteContext.Provider value={{ playedNoteParams, setPlayedNoteParams, playNote }}>
            {children}
        </NoteContext.Provider>
    );
};

/** 
 * Passe un contexte vers les composants externes qui récupèrent le contexte (objet) et 
 * tout ses attributs visibles par les composants externes.

 * @returns context Contextecourant 
 */
export const useNoteContext = () => {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error('useNoteContext must be used within a NoteProvider');
    }
    return context;
};
