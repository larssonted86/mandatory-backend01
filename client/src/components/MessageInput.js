import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getSocket} from '../socket';

export default function MessageInput({user}) {
  const {rid} = useParams();
  const [message, setMessage] = useState('');
  function onSubmit(e) {
    e.preventDefault();
    let socket = getSocket();
    socket.emit('new_message', {message: message, user: user, rid: rid});
    setMessage('');
  }

  return (
    <form onSubmit={onSubmit}>
      <input 
      onChange={e => 
      setMessage(e.target.value)} 
      value={message} type="text" 
      name="message"
      placeholder='Enter message' />
      <button type="submit">Send</button>
    </form>
  );
}
