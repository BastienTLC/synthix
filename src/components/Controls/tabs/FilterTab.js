import React, {useState} from 'react';
import { useSynthContext } from '../../../context/SynthContext';
import { Knob } from 'primereact/knob';
import './FilterTab.css';

const FilterTab = () => {
  const {filter} = useSynthContext(); //synthe a manip...
  const [cutoff, setCutoff] = useState(filter.frequency.value);

  return (
    <div className="synth-filter-tab">
      <div className="knob-text-combo">
        <Knob value={cutoff} onChange={(e) => { filter.frequency.set({value: e.value}); setCutoff(e.value); }} min={0} max={20000} step={1000} valueTemplate={'{value}Hz'} />
        <p>Cutoff</p>
      </div>

    </div>
  );
};

export default FilterTab;
