
import { ProgressBar } from 'primereact/progressbar';

const VolumeBar = ({ volume }) => {

    const progressBarStyle = {
        transition: "0.04s", // Désactive la transition
    };

    // Calcule la couleur en fonction du volume
    const getColor = () => {
        if (volume < 0.6) {
            // Vert jusqu'à 70%
            return 'rgb(0, 255, 0)';
        } else if (volume < 0.8) {
            // Orange entre 70% et 90%
            const red = Math.round((1 - (volume - 0.7) / 0.2) * 255);
            const green = 165; // Valeur verte constante
            const blue = 0;
            return `rgb(${red},${green},${blue})`;
        } else {
            // Rouge au-dessus de 90%
            const red = 255;
            const green = Math.round((1 - (volume - 0.9) / 0.1) * 255);
            const blue = 0;
            return `rgb(${red},${green},${blue})`;
        }
    };

    return (

        <div className="volume-bar">
            <ProgressBar
                value={volume * 100}
                pt={{
                    value: { style: { background: getColor(), ...progressBarStyle } },
                }}
                showValue={false}
            ></ProgressBar>
        </div>
    );
};

export default VolumeBar;
