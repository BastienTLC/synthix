// Piano.js
import React from 'react';
import NoteBind from './NoteBind';

class Piano extends React.Component {
    keyConfigurations = [
        { label: 'C4', frequency: '261.63', envelope: { attack: 0.1, decay: 0.8, sustain: 0.5, release: 1 } },
        { label: 'D4', frequency: '293.66', envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 1 } },
        { label: 'E4', frequency: '329.63', envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 1 } },
        { label: 'F4', frequency: '349.23', envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 1 } },
        { label: 'G4', frequency: '392.00', envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 1 } },
    ];

    render() {
        return (
            <div>
                {this.keyConfigurations.map((config, index) => (
                    <NoteBind key={index} config={config} />
                ))}
            </div>
        );
    }
}

export default Piano;
