import React, { createContext, useContext, useState } from 'react';

const NoteContext = createContext(); 

/**
 * Definition du provider avec 
 * @param {children}  
 * @returns 
 */
export const NoteProvider = ({ children }) => {
    const [playedNoteParams, setPlayedNoteParams] = useState(null);

    return (
        <NoteContext.Provider value={{ playedNoteParams, setPlayedNoteParams }}>
            {children}
        </NoteContext.Provider>
    );
};

/** 
 * Passe un contexte vers les composants externes qui récupèrent le contexte (objet) et 
 * tout ses attributs visibles par les composants externes.

 * @returns context Contextecourant 
 */
export const useNoteContext = () => {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error('useNoteContext must be used within a NoteProvider');
    }
    return context;
};
