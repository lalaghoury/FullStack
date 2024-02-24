import React from 'react'
import { useAuth } from '../../context/AuthContext';
import AppLayout from '../../Layout/Layout';

function Test() {
  const { auth } = useAuth();
  console.log(auth)

  return (
    <AppLayout>
      <h1>test</h1>
      <pre>{JSON.stringify(auth, null, 2)}</pre>
    </AppLayout>
  )
}

export default Test;
