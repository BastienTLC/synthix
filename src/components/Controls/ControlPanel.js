import React from 'react';
import ConfigTab from './tabs/ConfigTab';
import './ControlPanel.css';
import FilterTab from './tabs/FilterTab';

const ControlPanel = ( {chosenTab} ) => {

  return (
    <div className="synth-control-panel">
      { chosenTab==="Config" ? <ConfigTab /> : null }
      { chosenTab==="Filtre" ? <FilterTab /> : null }
    </div>
  );
};

export default ControlPanel;
