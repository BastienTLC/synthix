// SoundAnalysisContext.js
import { createContext, useContext, useState } from 'react';

const SoundAnalysisContext = createContext();

export const useSoundAnalysis = () => useContext(SoundAnalysisContext);

export const SoundAnalysisProvider = ({ children }) => {
    const [soundAnalysisData, setSoundAnalysisData] = useState({
        frequencyData: null,
        // Ajoutez d'autres paramètres d'analyse du son ici
        // par exemple: amplitude, spectre, temps, etc.
    });

    const updateSoundAnalysisData = (data) => {
        setSoundAnalysisData((prevData) => ({
            ...prevData,
            ...data,
        }));
    };

    return (
        <SoundAnalysisContext.Provider value={{ soundAnalysisData, updateSoundAnalysisData }}>
            {children}
        </SoundAnalysisContext.Provider>
    );
};
