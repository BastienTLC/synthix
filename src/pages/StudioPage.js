import React from 'react';
import Piano from '../components/Piano/Piano';
import Monitoring from '../components/Monitoring/Monitoring';
import ControlPanel from '../components/Controls/ControlPanel';
import { NoteProvider } from '../context/NoteContext';

const StudioPage = () => {
    return (
        <div>
            <NoteProvider>
                <Piano />
                <Monitoring />
                <ControlPanel />
            </NoteProvider>
        </div>
    );
};

export default StudioPage;
