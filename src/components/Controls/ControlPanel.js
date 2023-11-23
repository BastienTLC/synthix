import React, { useEffect, useState } from 'react';
import { Knob } from 'primereact/knob';
import { SelectButton } from 'primereact/selectbutton';
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
  const [type, setType] = useState("sine");

  useEffect( () => {
    const intervalId = setInterval(() => {
      synth.set({envelope: {
        attack: attack/100,
        decay: decay/100,
        sustain: sustain/100,
        release: release/100,
      },
        oscillator: {
          type: type
        }
      });
    }, 500); // Appelle la fonction toutes les 100 millisecondes (ajuste selon tes besoins)
    return () => {
      clearInterval(intervalId);
    };
  }, [attack, decay, sustain, release, synth]);

  const items = [
    { name: 'Sine', value: "sine" },
    { name: 'Sawtooth', value: "sawtooth" },
    { name: 'Triangle', value: "triangle" },
    { name: 'Square', value: "square" }
  ];
  
  return (
    <div className="synth-control-panel">
      <div className="card flex justify-content-center">
        <SelectButton value={type} onChange={(e) => setType(e.value)} optionLabel="name" options={items} />
      </div>

      <div className="knob-text-combo">
        <Knob value={volume} onChange={(e) => { synth.volume.value=(e.value-70)/2; setVolume(e.value); }} />
        <p>Volume</p>
      </div>
      <div className="knob-text-combo">
        <Knob value={attack} onChange={(e) => {setAttack(e.value); }} />
        <p>Attack</p>
      </div>
      <div className="knob-text-combo">
        <Knob value={decay} onChange={(e) => {setDecay(e.value); }} />
        <p>Decay</p>
      </div>
      <div className="knob-text-combo">
        <Knob value={sustain} onChange={(e) => {setSustain(e.value); }} />
        <p>Sustain</p>
      </div>
      <div className="knob-text-combo">
        <Knob value={release} onChange={(e) => {setRelease(e.value); }} />
        <p>Release</p>
      </div>
    </div>
  );
};

export default ControlPanel;
