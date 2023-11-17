import React, { useEffect } from 'react';
import { useNoteContext } from '../../context/NoteContext';
import WaveformGraph from './graphs/WaveformGraph';
const Monitoring = () => {
    const playedNoteParams = useNoteContext();

    useEffect(() => {

    }, [playedNoteParams]);

    return (
        <div>
            {/* Affiche le graphique de la waveform */}
            <WaveformGraph waveform={playedNoteParams.playedNoteParams && playedNoteParams.playedNoteParams.waveform} />
        </div>
    );
};

export default Monitoring;
