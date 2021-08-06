import React from 'react';
import PropTypes from 'prop-types';
import PinKey from './PinKey';
import './PinPad.scss';

const VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'X', 0, 'E'];

const PinPad = ({ onClick }) => {
    const renderKeys = () => VALUES.map(item => (
      <PinKey
        value={item}
        onClick={onClick}
        key={item}
      />
    ));

    return (
      <div className="PinPad">
        {renderKeys()}
      </div>
    );
};

PinPad.defaultProps = {
  onClick: () => {},
};

PinPad.propTypes = {
  onClick: PropTypes.func,
};

export default React.memo(PinPad);
