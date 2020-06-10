const express = require('express');


const roomsControllers = require('../controllers/rooms-controllers')

const router = express.Router();



router.get('/rooms', roomsControllers.getRooms)

router.get('/rooms/:rid', roomsControllers.getRoomById)

router.post('/rooms',roomsControllers.createRoom )

router.delete('/rooms/:rid', roomsControllers.deleteRoom)

module.exports = router;