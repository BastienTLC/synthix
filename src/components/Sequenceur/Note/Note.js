import React, {useEffect} from 'react';


const Note = ({note, index, cursorPosition}) => {
    const pNote = () => {
        console.log(note, index);
    };
    return (
        <div
            style={{ width: '100px', height: '100%', backgroundColor: note ? 'blue' : 'white' }}
            onClick={pNote}
        />
    );
};
export default Note;
