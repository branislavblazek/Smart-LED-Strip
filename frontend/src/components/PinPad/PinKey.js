import React from 'react';
import PropTypes from 'prop-types';

const PinKey = ({ value }) => {
  return (
    <div className="PinKey">
      <p>{value}</p>
    </div>
  );
};

PinKey.defaultProps = {
  value: 1,
};

PinKey.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default React.memo(PinKey);
