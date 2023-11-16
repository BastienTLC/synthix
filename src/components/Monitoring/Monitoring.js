import React, { useEffect } from 'react';
import { useNoteContext } from '../../context/NoteContext';

const Monitoring = () => {
    const playedNoteParams = useNoteContext();

    useEffect(() => {
        if (playedNoteParams) {
            console.log('Note played:', playedNoteParams);
            // Affiche les paramètres de la note dans le composant Monitoring
        }
    }, [playedNoteParams]);

    return (
        <div>
            {/* Contenu du composant Monitoring */}
        </div>
    );
};

export default Monitoring;
