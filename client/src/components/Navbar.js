import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/css/navbar.css'

function Room({room, onRemoveRoom}) {
  return <div className = 'navbar-room-card'>
    <Link to={"/api/room/" + room._id}>{room.name}</Link>
    <button onClick={() => onRemoveRoom(room._id)}>x</button> 
  </div>;
}

export default function Navbar({rooms, onAddNewRoom, onRemoveRoom}) {
  const [newRoom, setNewRoom] = useState('');
  function addNewRoom(e) {
    e.preventDefault();
    if (typeof onAddNewRoom === 'function') {
      onAddNewRoom(newRoom);
    }
    setNewRoom('');
  }
  return (
    <div className='navbar'>
      <nav>
        {rooms.map(room => {
          return <Room key={room._id} room={room} onRemoveRoom={onRemoveRoom} />;
        })}
      </nav>
      <h3>Add New Room</h3>
      <form onSubmit={addNewRoom}>
      <input
      className='inputField' 
      type="text" 
      onChange={e => setNewRoom(e.target.value)} 
      value={newRoom} />
      <button type="submit">Create room</button>
      </form>
    </div>
  )
}

