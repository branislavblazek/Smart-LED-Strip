import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './Spinner.scss';

const Spinner = ({ theme }) => (
  <div className={cx('Spinner', theme)}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

Spinner.defaultProps = {
  theme: 'white',
};

Spinner.propTypes = {
  theme: PropTypes.string,
};

export default React.memo(Spinner);
