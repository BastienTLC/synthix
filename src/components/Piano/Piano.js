// Piano.js
import React from 'react';
import NoteBind from './NoteBind';

class Piano extends React.Component {
    keyConfigurations = [
        { label: 'C4', frequency: '100.63', envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 1 } },
        { label: 'D4', frequency: '500.66', envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 1 } },
        { label: 'E4', frequency: '1000.63', envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 1 } },
        { label: 'F4', frequency: '2000.23', envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 1 } },
        { label: 'G4', frequency: '10000.00', envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 1 } },
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
