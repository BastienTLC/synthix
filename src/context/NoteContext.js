import React, { createContext, useContext } from 'react';
//import * as Tone from 'tone';

const NoteContext = createContext(); 

/**
 * Definition du provider avec 
 * @param {children}  
 * @returns 
 */
export const NoteProvider = ({ children }) => {
/*    const activeSynthsRef = useRef([]);
    const [activeSynths, setActiveSynths] = useState([]);
    const [volume, setVolume] = useState(75);

    const playNote = (config) => {
        const synth = new Tone.Synth(config.envelope).toDestination();
        const analyser = new Tone.Analyser('waveform', 64);
        synth.connect(analyser);
        synth.triggerAttackRelease(config.frequency, '8n');
        synth.volume.value = (volume - 70) / 2;

        activeSynthsRef.current.push({ synth, analyser });

        const intervalId = setInterval(() => {
            const waveform = analyser.getValue();
            activeSynthsRef.current = activeSynthsRef.current.map((s) => {
                if (s.synth === synth) {
                    return {
                        synth: s.synth,
                        analyser: s.analyser,
                        waveform: waveform,
                        volume: synth.volume.value,
                    };
                }
                return s;
            });

            setActiveSynths([...activeSynthsRef.current]);
        }, 40);

        setTimeout(() => {
            synth.dispose();
            analyser.dispose();
            activeSynthsRef.current = activeSynthsRef.current.filter((s) => s.synth !== synth);
            setActiveSynths([...activeSynthsRef.current]);
            clearInterval(intervalId);
        },  1000);
    };

    useEffect(() => {
        return () => {
            activeSynthsRef.current.forEach(({ synth, analyser }) => {
                synth.dispose();
                analyser.dispose();
            });
        };
    }, []);*/

    return (
        <NoteContext.Provider value={{ /*activeSynths, playNote, volume, setVolume*/ }}>
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