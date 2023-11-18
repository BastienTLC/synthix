// NoteBind.js
import React from 'react';
import { useNoteContext } from '../../context/NoteContext';

const NoteBind = ({ config }) => {
    const { playNote } = useNoteContext();

    const handleNote = () => {
        playNote(config);
    }

    const style = {
        border: '1px solid #333', // Bordure grise
        background: '#fff', // Fond blanc
        width: '60px', // Largeur du bouton
        height: '180px', // Hauteur du bouton
        borderRadius: '0 0 5px 5px', // Coins arrondis
        boxShadow: '2px 2px 5px #888888', // Ombre légère
    };

    return (
        <button style={style} onClick={handleNote}>
            {config.label}
        </button>
    );
};

export default NoteBind;
