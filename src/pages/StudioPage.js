import React, {useEffect, useState} from 'react';
import PianoPanel from '../components/Piano/PianoPanel';
import MonitoringPanel from '../components/Monitoring/MonitoringPanel';
import ControlPanel from '../components/Controls/ControlPanel';
import { SynthProvider } from '../context/SynthContext';
import SequenceurPanel from "../components/Sequenceur/SequenceurPanel";
import { Splitter, SplitterPanel } from 'primereact/splitter';
import synthixLogo from '../resources/gfx/synthix_logo.png';
import { Dialog } from 'primereact/dialog';
import { TabMenu } from 'primereact/tabmenu';
import './StudioPage.css';
//import { Tone } from 'tone/build/esm/core/Tone';
import * as Tone from 'tone';

const StudioPage = () => {
    const [aPropos, setaPropos] = useState(false);
    const [tab, setTab] = useState(0);

    const tabItems = [
        {label: 'Config', icon: 'pi pi-fw pi-sliders-h'},
        {label: 'Filter', icon: 'pi pi-fw pi-credit-card'},
        {label: 'Effets', icon: 'pi pi-fw pi-credit-card'}
    ];
    
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
        width: `100%`,   // Largeur basée sur la fenêtre
        margin: 0,
    };
    const allowAudioContext = async () => {
        await Tone.start();
        console.log('audio ready');
    }
    return (

        <div className={"synth-full-panel"} style={synthFullPanelStyle} onMouseDown={allowAudioContext} >
            <div className="header-logo"  >
                <img src={synthixLogo} alt="" draggable="false" onClick = {() => { setaPropos(true) }}  />
                <TabMenu model={tabItems} activeIndex={tab} onTabChange={(e) => setTab(e.index)} />
            </div>
            <Dialog header="Synthix" visible={aPropos} style={{ width: '50vw' }} onHide={() => setaPropos(false)}>
                <p className="m-0">
                    Développé par Jean-Marin RIBARIC et Bastien TALEC.
                    <br />
                    <br />
                    <i>Synthix 2023</i>
                </p>
            </Dialog>
            <SynthProvider>
                <Splitter layout="vertical" style={{ height: '100%' }}>
                    <SplitterPanel size={30}>
                        <Splitter>
                            <SplitterPanel className="flex align-items-center justify-content-center" size={50}>
                                <MonitoringPanel />
                            </SplitterPanel>
                            <SplitterPanel className="flex align-items-center justify-content-center" size={50}>
                                <ControlPanel chosenTab={tab}/>
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
            </SynthProvider>
        </div>
    );
};

export default StudioPage;
