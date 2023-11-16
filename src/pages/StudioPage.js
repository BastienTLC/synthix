import React from 'react';
import Piano from '../components/Piano/Piano';
import Monitoring from '../components/Monitoring/Monitoring';
import { NoteProvider } from '../context/NoteContext';

const StudioPage = () => {
    return (
        <div>
            <NoteProvider>
                <Piano />
                <Monitoring />
            </NoteProvider>
        </div>
    );
};

export default StudioPage;
