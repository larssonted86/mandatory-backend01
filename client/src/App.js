import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import './styles/css/App.css';
import Navbar from './components/Navbar'
import Chatwindow from './components/Chatwindow'
import Login from './components/Login'
import MessageInput from './components/MessageInput'

function App() {
  let [user, setUser] = useState(localStorage.getItem('user'));
  let [room, setRoom] = useState('general');
  let [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('/api/rooms')
      .then(res => {
        setRooms(res.data);
      });
  }, []);

  function onUserLogin(newUser) {
    setUser(newUser);
    localStorage.setItem('user', newUser);
  }

  if (!user) {
    return (
      <div className='App'>
        <div className='login'>
          <h2>Welcome </h2>
          <p>please enter tour name</p>
          <Login onLogin={onUserLogin} />
        </div>
      </div>
    );
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('user');
  }

  function addNewRoom(room) {
    axios.post('/api/rooms', {name: room})
      .then(res => {
        setRooms([...rooms, res.data.room]);
      });
  }

  function removeRoom(rid) {
    axios.delete('/api/rooms/' + rid)
      .then(res => {
        setRooms(rooms.filter(x => x._id !== rid));
      });
  }

  if (!rooms || !rooms.length) return <p>Loading...</p>;

  return (
    <div className="App">
      <Router>
        <aside>
          <h3>Rooms</h3>
          <button
          onClick={logout}>Logout</button>
          <Navbar  
          rooms={rooms} 
          onAddNewRoom={addNewRoom} 
          onRemoveRoom={removeRoom} />       
        </aside>
        <div className='content'>
        <Route exact path="/">
            <Redirect to={`/api/room/${rooms[0]._id}`} />
          </Route>
          <Route path="/api/room/:rid">
            <Chatwindow />
            <MessageInput user={user} />
          </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
