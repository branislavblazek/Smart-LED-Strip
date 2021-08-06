import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const PinKey = ({ value, onClick }) => {
const handleClick = useCallback(() => {
  onClick({ clicked: value });
}, [onClick, value]);

  return (
    <button
      className="PinKey"
      onClick={handleClick}
      onKeyPress={() => {}}
      type="button"
    >
      <p>{value}</p>
    </button>
  );
};

PinKey.defaultProps = {
  value: 1,
  onClick: () => {},
};

PinKey.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
};

export default React.memo(PinKey);
