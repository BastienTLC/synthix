import React, {useState, useEffect} from 'react';
import { Button } from 'primereact/button';
import './Control.css';
import { Knob } from 'primereact/knob';
import { TreeSelect } from 'primereact/treeselect';

const Control = ({ onStart, onStop, onReset, setBpmValue, bpmValue, setConfig }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);
    const [nodes, setNodes] = useState(null);

    useEffect(() => {
        const iterateAudioPresetFolders = () => {
            const folders = require.context('../../../resources/audioPreset', true);
            const folderKeys = folders.keys();

            const folderNodes = [];

            folderKeys.forEach(folderKey => {
                const parts = folderKey.split('/');
                const folderName = parts[1];

                let folderNode = folderNodes.find(node => node.key === folderName);

                if (!folderNode) {
                    folderNode = {
                        key: folderName,
                        label: folderName,
                        data: 'Folder',
                        icon: 'pi pi-fw pi-inbox',
                        children: [],
                    };

                    folderNodes.push(folderNode);
                }

                const fileName = parts[2];
                if (fileName && fileName.endsWith('.json')) {
                    const fileNode = {
                        key: fileName,
                        label: fileName,
                        data: 'File',
                        icon: 'pi pi-fw pi-inbox',
                        children: [],
                        command:() => console.log("coucou")
                    };
                    folderNode.children.push(fileNode);
                }
            });

            return folderNodes;
        };

        // Appeler iterateAudioPresetFolders une seule fois lors du montage du composant
        const audioPresetFolders = iterateAudioPresetFolders();
        setNodes(audioPresetFolders);
    }, []);

    const toggleSequencer = () => {
        if (isPlaying) {
            onStop();
            setElapsedTime(Date.now() - startTime);
        } else {
            onStart();
            setStartTime(Date.now());
        }
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    };
    const resetSequencer = () =>{
        toggleSequencer();
        onReset();
        setElapsedTime(0);
    }

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isPlaying, startTime]);

    const setNewConfig = (selection) => {
        setSelectedNodeKey(selection);
        if (selection.endsWith('.json')){
            nodes.forEach(folder => {
                folder.children.forEach(file => {
                    if (file.key === selection){
                        const json = require('../../../resources/audioPreset/' + folder.key + '/' + file.key);
                        setConfig(json);
                    }
                });
            });
        }
    };

    return (
        <div className={"timeline-control"}>
            <TreeSelect value={selectedNodeKey} onChange={(e) => setNewConfig(e.value)} options={nodes}
                        className="md:w-20rem w-full" placeholder="Select Item"></TreeSelect>
            <Button icon={isPlaying ? "pi pi-play" : "pi pi-pause"} rounded text raised aria-label="Filter" onClick={toggleSequencer}/>
            <Button icon="pi pi-refresh" rounded text raised aria-label="Filter" onClick={resetSequencer}/>
            <Button icon="pi pi-circle-fill" rounded text raised aria-label="Filter"/>
            <Knob value={bpmValue} onChange={(e) => setBpmValue(e.value)} min={-20} max={20} />
            <div className={"play-duration"}>{elapsedTime*bpmValue / 1000}s</div>
        </div>
    );
};

export default Control;

