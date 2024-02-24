import React, { useEffect } from 'react';
import { Divider } from 'antd';
import './Layout.scss';
import { useAccount } from '../context/AccountContext';


const AppLayout = ({ children }) => {
  const { handleUserActivity } = useAccount();

  useEffect(() => {
    handleUserActivity();
  }, [])

  return (

    <div className="app-container">{children}<Divider /></div>
  )
};

export default AppLayout;
