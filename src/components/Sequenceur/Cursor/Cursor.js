import React, { useEffect } from 'react';

const Cursor = ({ position, nbTrack, onMove, width, handleMouseDown, handleMouseUp }) => {

    useEffect(() => {
        const interval = setInterval(() => {
                onMove();
        }, 20); // ajustez la fréquence selon vos besoins

        return () => clearInterval(interval);
    }, [onMove]);


    return (
        <div
            style={{
                width: '5px',
                height: `${nbTrack * 60 + 'px'}`,
                backgroundColor: 'red',
                position: 'absolute',
                left: position + 'px',
                hover: 'grabbing',
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        />
    );
};

export default Cursor;

