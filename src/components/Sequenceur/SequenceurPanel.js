import React, { useState } from 'react';
import { useNoteContext } from '../../context/NoteContext';
import './SequenceurPanel.css';

const SequenceurPanel = () => {
    // Define state variables for controlling the synth
    const { volume, setVolume } = useNoteContext();

    return (
        <div className="synth-sequence-panel">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dignissimos harum illo impedit, provident sint soluta veritatis! Cum delectus illo modi suscipit ullam! Commodi delectus explicabo nobis quo sint? Accusamus adipisci architecto corporis exercitationem non provident, veritatis. Cupiditate debitis ea et eum omnis perferendis, placeat praesentium quam quia sint tempore?</p>
        </div>
    );
};

export default SequenceurPanel;
