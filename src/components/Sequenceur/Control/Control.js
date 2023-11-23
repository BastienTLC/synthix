import React from 'react';

const Control = ({ onStart, onStop, onReset }) => {
    return (
        <div>
            <button onClick={onStart}>Start</button>
            <button onClick={onStop}>Stop</button>
            <button onClick={onReset}>Reset</button>
        </div>
    );
};

export default Control;
