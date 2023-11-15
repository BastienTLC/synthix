// App.js
import React from 'react';
import StudioPage from './pages/StudioPage';
import { SoundAnalysisProvider } from './context/SoundAnalysisContext';

const App = () => {
    return (
        <div>
            <SoundAnalysisProvider>
                <StudioPage />
            </SoundAnalysisProvider>
        </div>
    );
};

export default App;
