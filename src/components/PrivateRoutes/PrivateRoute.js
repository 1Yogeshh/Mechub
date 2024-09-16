import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {

  const token = localStorage.getItem('token');
  const {user}=useSelector(store=>store.user);
    
    if (!token || !user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
