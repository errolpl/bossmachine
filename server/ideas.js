const express = require('express');
const ideasRouter = express.Router();
const apiRouter = require('./api')
const checkMillionDollarIdea = require('./checkMillionDollarIdea')
const {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,} = require('./db')

ideasRouter.param('ideaId', (req, res, next, id)=>{
    const ideaId = id
    if(getFromDatabaseById('ideas', ideaId)) {
        req.ideaId = id
        next()
    } else {
        res.status(404).res.send()
    }
})

ideasRouter.get('/', (req, res, next)=>{
    res.send(getAllFromDatabase('ideas'))
})

ideasRouter.get('/:ideaId', (req, res, next)=>{
    console.log(getFromDatabaseById('ideas', req.params.ideaId))
    res.send(getFromDatabaseById('ideas', req.params.ideaId))
} )

ideasRouter.post('/', (req, res, next)=>{
    const ideaStats = req.query
    
    const newIdea = addToDatabase('ideas', ideaStats)
    checkMillionDollarIdea(req.query.numWeeks, req.query.weeklyRevenue)

    console.log(newIdea)
    if(newIdea) {
        res.send(newIdea)
    } else {
        res.status(400).send()
    }
})

ideasRouter.put('/:ideaId', (req, res, next)=>{
    const ideaStats = req.query
    ideaStats.id = req.ideaId
    
    const updatedIdea = updateInstanceInDatabase('ideas', ideaStats)

    if(updatedIdea) {
        res.send(updatedIdea)
    } else {
        res.status(400).send()
    }
})

ideasRouter.delete('/:ideaId', (req, res, next)=>{
    const deletedIdea = deleteFromDatabasebyId('ideas', req.ideaId)
    console.log(deletedIdea)
    if(deletedIdea) {
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})

module.exports = ideasRouter;