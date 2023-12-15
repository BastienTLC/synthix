import React, { createContext, useContext, useState } from 'react';
import * as Tone from 'tone';

const SynthContext = createContext(); 

/**
 * Definition du provider avec 
 * @param {children}  
 * @returns 
 */
export const SynthProvider = ({ children }) => {
    const [envelope] = useState({ attack: 0.0, decay: 2.0, sustain: 0.0, release: 2.0 });
    const [analyser] = useState(new Tone.Analyser('waveform', 64));
    const [delay] = useState(new Tone.FeedbackDelay({delayTime: 0.0, feedback: 0.5, wet: 0.8}).connect(analyser).toDestination());
    const [filter] = useState(new Tone.Filter(20000, "lowpass").connect(delay));
/* synthe avec filtre: */    const [synth] = useState(new Tone.PolySynth( {maxPolyphony:64, voice: Tone.Synth , options:{ volume:-10, envelope: envelope, oscillator: { type : "sawtooth"}}}  ).connect(filter));
//   /* synthe sans filtre: */ const [synth] = useState(new Tone.PolySynth( {maxPolyphony:32, voice: Tone.Synth , options:{ volume:-20, envelope: envelope, oscillator: { type : "sine"}}}  ).connect(analyser).toDestination());
    const [waveform, setWaveform] = useState(analyser.getValue());
    
    const envelopeChange = (valeursEnvelope) => {
        synth.set({envelope: valeursEnvelope});
    };
    
    const playNoteDirect = (notes) => {
        synth.triggerAttackRelease(notes, "3n");
    };

    const playCustomNote = (notes, config) => {
        const synth = new Tone.Synth(config).toDestination();
        synth.triggerAttackRelease(notes, "3n");
    };

    const updateWaveform = () => {
        setWaveform(analyser.getValue());
    };

    return (
        <SynthContext.Provider value={ {analyser, synth, filter, delay, waveform,  updateWaveform, envelopeChange, playNoteDirect, playCustomNote} }>
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
