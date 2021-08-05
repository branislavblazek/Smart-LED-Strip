import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Checkbox.scss';

const Checkbox = ({ text, name, checked, enableFullClick, readOnly, onChange }) => {
  const handleToggle = useCallback(
    () => onChange({ [name]: readOnly ? !checked : checked }),
    [onChange, checked, name, readOnly],
  );

  const handleClick = useCallback(
    () => {
      if (enableFullClick) handleToggle();
    }, [enableFullClick, handleToggle],
  );

  return (
    <div>
      <div className={cx('CheckBoxWrap', { fullClick: enableFullClick })}>
        <label className="CheckBox">
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={handleToggle}
          />
          <span className="CheckBoxMark" />
        </label>
        <div
          className="CheckBoxText"
          onClick={handleClick}
          role="none"
        >
          {text}
        </div>
      </div>
    </div>
  );
};

Checkbox.defaultProps = {
  text: '',
  name: '',
  checked: false,
  enableFullClick: false,
  readOnly: true,
  onChange: () => { },
};

Checkbox.propTypes = {
  text: PropTypes.node,
  name: PropTypes.string,
  checked: PropTypes.bool,
  enableFullClick: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

export default React.memo(Checkbox);
