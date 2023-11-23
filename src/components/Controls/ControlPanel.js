import React, { useState } from 'react';
import { Knob } from 'primereact/knob';
import { useSynthContext } from '../../context/SynthContext';
import './ControlPanel.css';

const ControlPanel = () => {
  // Define state variables for controlling the synth
  const {synth } = useSynthContext();
  const [volume, setVolume] = useState(75);
  
  return (
    <div className="synth-control-panel">
      <Knob value={volume} onChange={(e) => { synth.volume.value=(e.value-70)/2; setVolume(e.value); }} />
    </div>
  );
};

export default ControlPanel;
