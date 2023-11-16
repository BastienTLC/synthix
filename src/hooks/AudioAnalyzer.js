import { useEffect, useState } from 'react';

const useAudioAnalyzer = () => {
    const [audioContext, setAudioContext] = useState(null);
    const [analyser, setAnalyser] = useState(null);

    useEffect(() => {
        const initAudioAnalyzer = async () => {
            try {
                const context = new (window.AudioContext || window.webkitAudioContext)();
                const analyserNode = context.createAnalyser();

                // Crée un nœud de gain pour contrôler le volume
                const gainNode = context.createGain();
                gainNode.gain.value = 0; // Définis le volume à 0 pour ne pas être audible

                // Connecte le nœud de gain à l'analyseur
                gainNode.connect(analyserNode);

                // Connecte l'analyseur à la destination audio (haut-parleurs)
                analyserNode.connect(context.destination);

                // Capture l'audio global de la page avec MediaStream Recording
                const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const audioSource = context.createMediaStreamSource(audioStream);
                audioSource.connect(gainNode);

                setAudioContext(context);
                setAnalyser(analyserNode);
            } catch (error) {
                console.error('Error initializing AudioContext:', error);
            }
        };

        initAudioAnalyzer();

        // Nettoyage à la fin du cycle de vie
        return () => {
            if (audioContext) {
                audioContext.close();
            }
        };
    }, []);

    const getFrequencyData = () => {
        if (!analyser) {
            return [];
        }

        const bufferLength = analyser.frequencyBinCount;
        const frequencyData = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(frequencyData);
        console.log(analyser)
        return frequencyData;
    };

    return { audioContext, analyser, getFrequencyData };
};

export default useAudioAnalyzer;
