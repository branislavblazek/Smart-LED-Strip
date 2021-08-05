import React from 'react';
import Icon from '../Icon/Icon';
import './Loading.scss';

const Loading = () => {
    return (
      <div className="loading">
        <Icon type="spinner" customClass="spinner" />
      </div>
    );
};

export default React.memo(Loading);
