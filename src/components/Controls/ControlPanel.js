import React, { useState } from 'react';
import { Knob } from 'primereact/knob';
import { useSynthContext } from '../../context/SynthContext';
import './ControlPanel.css';

const ControlPanel = () => {
  // Define state variables for controlling the synth
  const { synth } = useSynthContext();
  const [volume, setVolume] = useState(synth.options.volume);
  
  return (
    <div className="synth-control-panel">
      <Knob value={volume} onChange={(e) => { synth.options.volume = e.value; setVolume(e.value); }} />
    </div>
  );
};

export default ControlPanel;
