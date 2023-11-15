// NoteBind.js
import React from 'react';
import * as Tone from 'tone';

const NoteBind = ({ config }) => {
    const playNote = () => {
        const synth = new Tone.Synth(config.envelope).toDestination();
        synth.triggerAttackRelease(config.frequency, '8n');
    };

    return (
        <button onClick={playNote}>
            {config.label}
        </button>
    );
};

export default NoteBind;
