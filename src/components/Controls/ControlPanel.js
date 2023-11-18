import React, { useState } from 'react';
import { Knob } from 'primereact/knob';
import { useNoteContext } from '../../context/NoteContext';
import './ControlPanel.css';

const ControlPanel = () => {
  // Define state variables for controlling the synth
  const { volume, setVolume } = useNoteContext();

  return (
    <div className="synth-control-panel">
      <Knob value={volume} onChange={(e) => setVolume(e.value)} />
    </div>
  );
};

export default ControlPanel;
