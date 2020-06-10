import React, {useEffect, useState} from 'react';
import '../styles/css/login.css'

export default function Login({onLogin}) {
  let [user, setUser] = useState('');
  function onSubmit(e) {
    e.preventDefault();
    if (typeof onLogin === 'function') {
      onLogin(user);
    }
  }
  return <div className='login'>
    <form 
      className='loginform'
      onSubmit={onSubmit}>
      <input
      className='inputField' 
      type="text" 
      value={user} 
      onChange={e => setUser(e.target.value)} />
      <button
      type="submit">Login</button>
    </form>
  </div>
}
