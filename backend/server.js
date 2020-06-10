const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const Room = require('./models/room')

const url = process.env.ATLAS_URL;
const roomsRoutes = require('./routes/rooms-routes')
const HttpError = require('./models/http-error')

const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8090;

//MIDDLEWARES
app.use(express.json());

app.use('/api/', roomsRoutes);

app.use((req,res,next) => {
  const error = new HttpError('could not find this route', 404)
  return next(error)
})

app.use((error,req,res,next) => {
  if(res.headerSent){
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'an unknown error occured'})
});




function createMessage(msg) {
  let rid = msg.rid;
  return Room.findByIdAndUpdate(rid, {'$push': {messages: {message: msg.message, user: msg.user}}}).then(() => {
    return msg;
  });   
}

io.on('connection', (socket) => {
  socket.on('join_room', newrid => {
    for (let rid in socket.rooms) {
      if (rid !== socket.id) {
        socket.leave(rid);
      }
    }
    socket.join(newrid);
  });

  socket.on('new_message', msg => {
    createMessage(msg)
    .then(createdMsg => {
        io.to(msg.rid).emit('new_message', createdMsg);
      });
  });
});

mongoose
.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => {
  http.listen(port, () =>{
    console.log(`server is running on port: ${port}`)
  });
  console.log('Connected to database')
})
.catch( err => {
  console.log(err)
})