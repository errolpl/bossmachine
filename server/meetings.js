const express = require('express');
const meetingsRouter = express.Router();
const apiRouter = require('./api')
const {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,} = require('./db')

meetingsRouter.param('meetingId', (req, res, next, id)=>{
    const meetingId = id
    if(getFromDatabaseById('meetings', meetingId)) {
        req.meetingId = id
        next()
    } else {
        res.status(404).res.send()
    }
})

meetingsRouter.get('/', (req, res, next)=>{
    res.send(getAllFromDatabase('meetings'))
})


meetingsRouter.post('/', (req, res, next)=>{
    
    const newMeeting = createMeeting()

    console.log(newMeeting)
    if(newMeeting) {
        res.send(newMeeting)
    } else {
        res.status(400).send()
    }
})

meetingsRouter.delete('/', (req, res, next)=>{
    const deleteMeetings = deleteAllFromDatabase('meetings')
    console.log(deleteMeetings)
    if(deleteMeetings) {
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})

module.exports = meetingsRouter;