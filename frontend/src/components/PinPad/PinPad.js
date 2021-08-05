import React from 'react';
import PinKey from './PinKey';
import './PinPad.scss';

const VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'X', 0, 'E'];

const PinPad = () => {
    const renderKeys = () => VALUES.map(item => (
      <PinKey
        value={item}
        key={item}
      />
    ));

    return (
      <div className="PinPad">
        {renderKeys()}
      </div>
    );
};

PinPad.defaultProps = {};

PinPad.propTypes = {};

export default React.memo(PinPad);
