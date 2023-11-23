import React, { useEffect, useState } from 'react';
import { Knob } from 'primereact/knob';
import { useSynthContext } from '../../context/SynthContext';
import './ControlPanel.css';

const ControlPanel = () => {
  // Define state variables for controlling the synth
  const {synth} = useSynthContext();
  const [volume, setVolume] = useState(50);
  const [attack, setAttack] = useState(0);
  const [decay, setDecay] = useState(50);
  const [sustain, setSustain] = useState(0);
  const [release, setRelease] = useState(20);

  useEffect( () => {
    const intervalId = setInterval(() => {
      synth.set({envelope: {
        attack: attack/100,
        decay: decay/100,
        sustain: sustain/100,
        release: release/100,
      }});
    }, 500); // Appelle la fonction toutes les 100 millisecondes (ajuste selon tes besoins)
    return () => {
      clearInterval(intervalId);
    };
  }, [attack, decay, sustain, release, synth]);
  
  return (
    <div className="synth-control-panel">
      <Knob value={volume} onChange={(e) => { synth.volume.value=(e.value-70)/2; setVolume(e.value); }} />
      <Knob value={attack} onChange={(e) => {setAttack(e.value); }} />
      <Knob value={decay} onChange={(e) => {setDecay(e.value); }} />
      <Knob value={sustain} onChange={(e) => {setSustain(e.value); }} />
      <Knob value={release} onChange={(e) => {setRelease(e.value); }} />
    </div>
  );
};

export default ControlPanel;
