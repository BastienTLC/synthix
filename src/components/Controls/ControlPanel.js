import React, { useEffect, useState } from 'react';
import { Knob } from 'primereact/knob';
import { Dropdown } from 'primereact/dropdown';
import { useSynthContext } from '../../context/SynthContext';
import './ControlPanel.css';
import sinelogo from '../../gfx/svg/wave-sine-bold.svg';
import sawtoothlogo from '../../gfx/svg/wave-sawtooth-bold.svg';
import trianglelogo from '../../gfx/svg/wave-triangle-bold.svg';
import squarelogo from '../../gfx/svg/wave-square-bold.svg';
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { ChevronRightIcon } from 'primereact/icons/chevronright';
//import 'primeflex/primeflex.css'; 

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
      synth.set({
        envelope: {
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
  }, [attack, decay, sustain, release, synth, type]);

  const items = [
    { name: 'Sine', value: "sine"},
    { name: 'Sawtooth', value: "sawtooth"},
    { name: 'Triangle', value: "triangle"},
    { name: 'Square', value: "square"}
  ];

  const selectedCountryTemplate = (option, props) => {
      if (option) {
          return (
              <div className="choix-dropdown">
                  { option.value === "sine" ? <img alt={option.name} src={sinelogo} className="wave-logo" /> : null}
                  { option.value === "sawtooth" ? <img alt={option.name} src={sawtoothlogo} className="wave-logo" /> : null}
                  { option.value === "triangle" ? <img alt={option.name} src={trianglelogo} className="wave-logo" /> : null}
                  { option.value === "square" ? <img alt={option.name} src={squarelogo} className="wave-logo" /> : null}
                  <div>{option.name}</div>
              </div>
          );
      }

      return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option) => {
      return (
          <div className="choix-dropdown"> 
                {/* /!\ c'est un peu débile de faire comme ça mais j'ai essayé d'assigner les logo
                  dans leur propre champ dans l'objet item mais ça marche pas; donc pour l'instant on fait comme ça */} 
              { option.value === "sine" ? <img alt={option.name} src={sinelogo} className="wave-logo" /> : null}
              { option.value === "sawtooth" ? <img alt={option.name} src={sawtoothlogo} className="wave-logo" /> : null}
              { option.value === "triangle" ? <img alt={option.name} src={trianglelogo} className="wave-logo" /> : null}
              { option.value === "square" ? <img alt={option.name} src={squarelogo} className="wave-logo" /> : null}
              <div>{option.name}</div>
          </div>
      );
  };

  return (
    <div className="synth-control-panel">
      <div className="selection-forme-onde">
        <Dropdown value={type} onChange={(e) => setType(e.value)} options={items} optionLabel="name" placeholder="Select waveform" 
          valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem"  
          dropdownIcon={(opts) => {
                  return opts.iconProps['data-pr-overlay-visible'] ? <ChevronRightIcon {...opts.iconProps} /> : <ChevronDownIcon {...opts.iconProps} />;
                }}/>
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
