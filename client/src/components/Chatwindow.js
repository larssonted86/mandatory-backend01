import React, {useState,useEffect} from 'react'
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {getSocket} from '../socket';
import '../styles/css/chatwindow.css'


function ChatBubble ({message}){
  return <div className='chatBubble'>
          <h3 className='chatuser'>{message.user}</h3>
          <h3 className='chatmessage'>{message.message}</h3>
        </div>
}

export default function Chatwindow() {
  const {rid} = useParams();
  const [roomName, setRoomName] = useState(null);
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    axios.get(`/api/rooms/${rid}`)
      .then(res => {
        setMessages(res.data.room.messages);
        setRoomName(res.data.room.name);
      });
  }, [rid]);
  
  useEffect(() => {
    let socket = getSocket();
    function onNewMessage(msg) {
      setMessages(messages => [...messages, msg]);
    }

    socket.emit('join_room', rid);

    socket.on('new_message', onNewMessage);
    return () => {
      socket.off('new_message', onNewMessage);
    }
  }, [rid]);
  return (
    <div className='chatwindow'> 
    <h3>{roomName}</h3>
    <span className='spacer'></span>    
      {messages.map((message, index) => <ChatBubble key={index} message={message} />)}
    </div>
  )
}
