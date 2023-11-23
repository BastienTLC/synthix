import React, { createContext, useContext, useState } from 'react';
import * as Tone from 'tone';

const SynthContext = createContext(); 

/**
 * Definition du provider avec 
 * @param {children}  
 * @returns 
 */
export const SynthProvider = ({ children }) => {
    const [envelope] = useState({ attack: 0, decay: 0.8, sustain: 0, release: 0.8 });
    const [analyser] = useState(new Tone.Analyser('waveform', 256));
    const [synth] = useState(new Tone.PolySynth( {maxPolyphony:32, voice: Tone.Synth , options:{ volume:10, envelope: envelope, oscillator: { type : "sawtooth"}}}  ).connect(analyser).toDestination());
    const [waveform, setWaveform] = useState(analyser.getValue());
    
    const handleEnvelopeChange = (valeursEnvelope) => {
        synth.envelope = valeursEnvelope;
    };
    
    const handleVolumeChange = (nvVolume) => {
        synth.options.volume = nvVolume;
    };
    
    const playNoteDirect = (notes) => {
        synth.triggerAttackRelease(notes, "3n");
    };

    const updateWaveform = () => {
        setWaveform(analyser.getValue());
    }

    return (
        <SynthContext.Provider value={ {analyser, synth, waveform, updateWaveform, handleEnvelopeChange, handleVolumeChange, playNoteDirect} }>
            {children}
        </SynthContext.Provider>
    );
};

/** 
 * Passe un contexte vers les composants externes qui récupèrent le contexte (objet) et 
 * tout ses attributs visibles par les composants externes.

 * @returns context Contextecourant 
 */
export const useSynthContext = () => {
    const context = useContext(SynthContext);
    if (!context) {
        throw new Error('useSynthContext must be used within a SynthProvider');
    }
    return context;
};
