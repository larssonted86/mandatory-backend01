const express = require('express');
const mongoosedb = require ('./mongoose')
const Room = require('./models/room')
//const {getDB, createObjectId} = require('./db');

const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.use(express.json());
//const api = express.Router();

//api.get('/rooms', (req, res) => {
//  let db = getDB();
//  db.collection('rooms')
//    .find()
//    .toArray()
//    .then(rooms => {
//      res.json({rooms});
//    })
//    .catch(e => {
//      console.error(e);
//      res.status(500).end();
//    });
//});

app.get("/rooms", async (req, res) => {
  const rooms = await Room.find()
  res.send(rooms)
})

//app.get('/rooms/:roomId', (req, res) => {
//  let roomId = req.params.roomId;
//  let db = getDB();
//  db.collection('rooms')
//    .findOne({_id: createObjectId(roomId)}) 
//    .then(room => {
//      res.json(room);
//    })
//    .catch(e => {
//      console.error(e);
//      res.status(500).end();
//    });
//});


app.post('/rooms', mongoosedb.createRoom);
//api.post('/rooms', (req, res) => {
//  let {name} = req.body;
//  let db = getDB();
//  db.collection('rooms').insertOne({name: name, messages: []})
//    .then(result => {
//      res.status(201).send(result.ops[0]);
//    })
//    .catch(e => {
//      console.error(e);
//      res.status(500).end();
//    });
//});

//api.delete('/rooms/:roomId', (req, res) => {
//  let roomId = req.params.roomId;
//  let db = getDB();
//  db.collection('rooms').remove({_id: createObjectId(roomId)})
//    .then(() => {
//      res.status(204).end();
//    })
//    .catch(e => {
//      console.error(e);
//      res.status(500).end();
//    });
//});

//function createMessage(msg) {
//  let roomId = msg.roomId;
//  let db = getDB();
//  return db.collection('rooms').update({_id: createObjectId(roomId)}, {'$push': {messages: {message: msg.message, user: msg.user}}})
//    .then(() => {
//      return msg;
//    });
//}

//app.use('/api', api);

//io.on('connection', (socket) => {
//  socket.on('join_room', newRoomId => {
//    for (let roomId in socket.rooms) {
//      if (roomId !== socket.id) {
//        socket.leave(roomId);
//      }
//    }
//    socket.join(newRoomId);
//  });

//  socket.on('new_message', msg => {
//    createMessage(msg)
//      .then(createdMsg => {
//        io.to(msg.roomId).emit('new_message', createdMsg);
//      });
//  });
//});

http.listen(8090, function() {
  console.log("STARTED ON ", 8090);
});
