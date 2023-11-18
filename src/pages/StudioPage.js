import React, {useEffect, useState} from 'react';
import PianoPanel from '../components/Piano/PianoPanel';
import MonitoringPanel from '../components/Monitoring/MonitoringPanel';
import ControlPanel from '../components/Controls/ControlPanel';
import { NoteProvider } from '../context/NoteContext';
import SequenceurPanel from "../components/Sequenceur/SequenceurPanel";
import { Splitter, SplitterPanel } from 'primereact/splitter';
import './StudioPage.css';

const StudioPage = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const synthFullPanelStyle = {
        height: `${window.innerHeight}px`, // Hauteur basée sur la fenêtre
        width: `${window.innerWidth}px`,   // Largeur basée sur la fenêtre
        margin: 0,
    };
    return (

        <div className={"synth-full-panel"} style={synthFullPanelStyle}>
            <NoteProvider>
                <Splitter className={"synth-splitter"} style={{ height: '100%' }}>
                    <SplitterPanel size={100}>
                        <Splitter layout="vertical" style={{ height: '100%' }}>
                            <SplitterPanel size={30}>
                                <Splitter>
                                    <SplitterPanel className="flex align-items-center justify-content-center" size={50}>
                                        <MonitoringPanel />
                                    </SplitterPanel>
                                    <SplitterPanel className="flex align-items-center justify-content-center" size={50}>
                                        <ControlPanel />
                                    </SplitterPanel>
                                </Splitter>
                            </SplitterPanel>
                            <SplitterPanel className="flex align-items-center justify-content-center" size={40}>
                                <PianoPanel />
                            </SplitterPanel>
                            <SplitterPanel className="flex align-items-center justify-content-center" size={30}>
                                <SequenceurPanel />
                            </SplitterPanel>
                        </Splitter>
                    </SplitterPanel>
                </Splitter>
            </NoteProvider>
        </div>
    );
};

export default StudioPage;
