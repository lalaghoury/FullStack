import React from 'react'
import { useAuth } from '../../context/AuthContext';

function Test() {
  const { auth, setAuth } = useAuth();
  console.log(auth)

  return (
    <div>
      <h1>test</h1>
      <pre>{JSON.stringify(auth, null, 2)}</pre>
    </div>
  )
}

export default Test;