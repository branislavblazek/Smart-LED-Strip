import React from 'react';
import PinKey from './PinKey';
import './PinPad.scss';

const VALUES = [1,2, 3, 4, 5, 6, 7, 8, 9];

const PinPad = () => {
    const renderKeys = () => VALUES.map(item => (
        <PinKey 
            value={item}
        />
    ));

    return (
        <div className="PinPad">
            {renderKeys()}
        </div>
    );
};

export default React.memo(PinPad);