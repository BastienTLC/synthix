import React, {useState} from 'react';
import { useSynthContext } from '../../../context/SynthContext';
import { Knob } from 'primereact/knob';
//import './EffectsTab.css';

const EffectsTab = () => {
  const {delay} = useSynthContext(); //synthe a manip...
  const [delayTime, setDelayTime] = useState(0);

  console.log(delay);

  return (
    <div className="synth-filter-tab">
      <div className="knob-text-combo">
        <Knob value={delayTime} onChange={(e) => { delay.delayTime.set({value: e.value}); setDelayTime(e.value); }} min={0} max={1} step={0.1} valueTemplate={'{value}s'} />
        <p>Delay</p>
      </div>

    </div>
  );
};

export default EffectsTab;
