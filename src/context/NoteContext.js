import React, { createContext, useContext, useState } from 'react';

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
    const [playedNoteParams, setPlayedNoteParams] = useState(null);

    const handleNotePlay = (params) => {
        setPlayedNoteParams(params);
    };

    return (
        <NoteContext.Provider value={{ playedNoteParams, handleNotePlay }}>
            {children}
        </NoteContext.Provider>
    );
};

export const useNoteContext = () => {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error('useNoteContext must be used within a NoteProvider');
    }
    return context;
};
