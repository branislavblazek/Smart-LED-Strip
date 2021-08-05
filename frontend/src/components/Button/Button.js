import React, { useCallback, useRef, useEffect } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ onClick, value, theme, focus, children }) => {
  const buttonRef = useRef(null);

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      return onClick(value);
    }, [onClick, value],
  );

  useEffect(() => {
    if (focus) buttonRef.current.focus();
  }, [focus]);

  return (
    <button
      onClick={handleClick}
      className={cx('Button', theme)}
      type="button"
      ref={buttonRef}
    >
      <span>{children}</span>
    </button>
  );
};

Button.defaultProps = {
  onClick: () => { },
  value: null,
  theme: '',
  focus: false,
  children: '',
};

Button.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
  theme: PropTypes.string,
  focus: PropTypes.bool,
  children: PropTypes.node,
};

export default React.memo(Button);
