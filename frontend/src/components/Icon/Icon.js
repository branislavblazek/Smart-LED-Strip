/* eslint-disable max-lines */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import spinner from './spinner.svg';

const IMAGE_ICON_SOURCE = {
  spinner,
};

const Icon = ({ type, alt, customClass, onClick }) => {
  if (!type) return null;
  const src = type.startsWith('data:image/;base64') ? type : IMAGE_ICON_SOURCE[type];
  if (!src) return null;
  return (
    <img
      className={cx(customClass)}
      src={src}
      alt={alt}
      title={alt}
      role="none"
      onClick={onClick}
      onKeyPress={onClick}
    />
  );
};

Icon.defaultProps = {
  type: '',
  alt: '',
  customClass: '',
  onClick: () => {},
};

Icon.propTypes = {
  type: PropTypes.string,
  alt: PropTypes.string,
  customClass: PropTypes.string,
  onClick: PropTypes.func,
};

export default React.memo(Icon);
