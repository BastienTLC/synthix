import React, { useEffect } from 'react';

const Cursor = ({ position, nbTrack, onMove, width}) => {
    useEffect(() => {
        const interval = setInterval(() => {
            onMove();
        }, 20); // adjust the frequency as needed

        return () => clearInterval(interval);
    }, [onMove]);

    return (
            <div style={{
                width: '5px',
                height:  `${nbTrack * 60 + 'px'}`,
                backgroundColor: 'red',
                position: 'absolute',
                left: position + 'px',
                transition: 'left 0.3s ease',
            }}/>
    );
};

export default Cursor;

