import React, { useState } from 'react';
import { Knob } from 'primereact/knob';
import { Dropdown } from 'primereact/dropdown';
import { useSynthContext } from '../../../context/SynthContext';
import './ConfigTab.css';
import sinelogo from '../../../resources/gfx/svg/wave-sine-bold.svg';
import sawtoothlogo from '../../../resources/gfx/svg/wave-sawtooth-bold.svg';
import trianglelogo from '../../../resources/gfx/svg/wave-triangle-bold.svg';
import squarelogo from '../../../resources/gfx/svg/wave-square-bold.svg';
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { ChevronRightIcon } from 'primereact/icons/chevronright';

const ConfigTab = () => {
  // Define state variables for controlling the synth
  const {synth} = useSynthContext();
  const [volume, setVolume] = useState(75);
  const [attack, setAttack] = useState(synth.options.envelope.attack);
  const [decay, setDecay] = useState(synth.options.envelope.decay);
  const [sustain, setSustain] = useState(synth.options.envelope.sustain*100);
  const [release, setRelease] = useState(synth.options.envelope.release);
  const [type, setType] = useState(synth.options.oscillator.type);

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
    <div className="synth-config-tab">
      <div className="selection-forme-onde">
        <Dropdown value={type} onChange={(e) => {synth.set({oscillator: {type: e.value}}); setType(e.value);} } options={items} optionLabel="name" placeholder="Select waveform" 
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
        <Knob value={attack} onChange={(e) => { synth.set({envelope: {attack: e.value}}); setAttack(e.value); }} min={0} max={2} step={.1} valueTemplate={'{value}s'} />
        <p>Attack</p>
      </div>
      <div className="knob-text-combo">
        <Knob value={decay} onChange={(e) => { synth.set({envelope: {decay: e.value}}); setDecay(e.value); }} min={0} max={2} step={.1} valueTemplate={'{value}s'} />
        <p>Decay</p>
      </div>
      <div className="knob-text-combo">
        <Knob value={sustain} onChange={(e) => { synth.set({envelope: {sustain: e.value/100}}); setSustain(e.value); }} valueTemplate={'{value}%'}    />
        <p>Sustain</p>
      </div>
      <div className="knob-text-combo">
        <Knob value={release} onChange={(e) => { synth.set({envelope: {release: e.value}}); setRelease(e.value); }} min={0} max={5} step={.1}  valueTemplate={'{value}s'} />
        <p>Release</p>
      </div>
    </div>
  );
};

export default ConfigTab;
