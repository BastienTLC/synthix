import React from 'react';
import ConfigTab from './tabs/ConfigTab';
import './ControlPanel.css';
import FilterTab from './tabs/FilterTab';
import EffectsTab from './tabs/EffectsTab';

const ControlPanel = ( {chosenTab} ) => {

  return (
    <div className="synth-control-panel">
      { chosenTab===0 ? <ConfigTab /> : null }
      { chosenTab===1 ? <FilterTab /> : null }
      { chosenTab===2 ? <EffectsTab /> : null }
    </div>
  );
};

export default ControlPanel;
