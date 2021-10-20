import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CONTROL_ACTIONS } from '../../store/actions';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: CONTROL_ACTIONS.GET_CONTROL });
  }, [dispatch]);

  return (
    <div className="Dashboard">
      dasdas
    </div>
  );
};

export default React.memo(Dashboard);
