/* eslint-disable max-lines */
import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '../Icon/Icon';
import './Input.scss';

const Input = ({ id, name, value, placeholder, forwardRef, preIcon, className, focus,
  removeAllText, onChange, onKeyNavigation, autoComplete, settings }) => {
  const inputRef = useRef(null);
  const ref = forwardRef || inputRef;

  const handleChange = useCallback(
    (event) => {
      const data = event.target;
      onChange({ [data.name]: data.value });
    }, [onChange],
  );

  const handleKeyDown = useCallback(
    event => {
      onKeyNavigation({
        code: event.keyCode,
        key: event.key,
      });
    }, [onKeyNavigation],
  );

  const handleRemoveText = useCallback(() => { onChange({ [name]: '' }); ref.current.focus(); }, [onChange, name, ref]);
  const renderRemoveButton = () => {
    if (!removeAllText || !value.length) return null;

    return <Icon type="deleteIcon" alt="" customClass="removeAllText" onClick={handleRemoveText} />;
  };

  useEffect(() => {
    if (focus) ref.current.focus();
  }, [focus, id, ref]);

  const rows = settings?.rows || 1;
  const renderInput = () => (
    <>
      <Icon type={preIcon} alt="" customClass="InputIcon" />
      <input
        className={cx('Input', className)}
        name={name}
        value={value}
        placeholder={placeholder}
        ref={ref}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoComplete={autoComplete ? null : 'off'}
      />
    </>
  );
  const renderTextArea = () => (
    <textarea
      className="Input"
      name={name}
      value={value}
      placeholder={placeholder}
      ref={ref}
      rows={rows}
      onChange={handleChange}
    />
  );
  return (
    <div className="InputBox">
      {rows > 1 ? renderTextArea() : renderInput()}
      {renderRemoveButton()}
    </div>
  );
};

Input.defaultProps = {
  id: '',
  name: '',
  value: '',
  placeholder: '',
  forwardRef: null,
  preIcon: '',
  className: null,
  focus: false,
  removeAllText: false,
  onChange: () => {},
  onKeyNavigation: () => {},
  autoComplete: false,
  settings: {},
};

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  forwardRef: PropTypes.object,
  preIcon: PropTypes.string,
  className: PropTypes.node,
  focus: PropTypes.bool,
  removeAllText: PropTypes.bool,
  onChange: PropTypes.func,
  onKeyNavigation: PropTypes.func,
  autoComplete: PropTypes.bool,
  settings: PropTypes.object,
};

export default React.memo(Input);
