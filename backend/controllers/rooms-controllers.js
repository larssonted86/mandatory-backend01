const HttpError = require('../models/http-error')
const Room = require('../models/room')

const getRooms = async (req,res,next) => {
  const rooms = await Room.find().exec()
  res.send(rooms)
};

const getRoomById = async (req,res,next) => {
  const roomId = req.params.rid;
  let room;
  try{
    room = await Room.findById(roomId)
  }catch(err){
    const error = new HttpError(
      'Failed to find room, please try again',
      500
    );
    return next(error);
  }

  if(!room){
    const error = new HttpError(
      'Could not find a room for the provided id', 
      404
      );    
    return next(error);
  }
  
  res.json({room: room.toObject( {getters: true}) });
};

const createRoom = async (req,res,next) => {
  const {name} = req.body;
  const createdRoom = new Room({
    name: name,
    messages: [],
  })

  
  try{
    await createdRoom.save();
  }catch(err){
    const error = new HttpError(
      'Failed to create room, please try again',
      500
    );
    return next(error);
  }
  

  res.status(201).json({room: createdRoom})
}

const deleteRoom = async (req,res,next) => {
  const roomId = req.params.rid
  let room;
  try{
   room =  await Room.findByIdAndDelete(roomId)
  }catch(err){
    const error = new HttpError(
      'Failed to delete room, please try again',
      500
    );
    return next(error);
  }
  res.status(200).json({message: 'Deleted Room'})
}

exports.getRooms = getRooms;
exports.getRoomById = getRoomById;
exports.createRoom = createRoom;
exports.deleteRoom = deleteRoom;