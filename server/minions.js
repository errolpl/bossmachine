const express = require('express');
const minionsRouter = express.Router();
const apiRouter = require('./api')
const {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,} = require('./db')

minionsRouter.param('minionId', (req, res, next, id)=>{
    const minionId = id
    if(getFromDatabaseById('minions', minionId)) {
        req.minionId = id
        next()
    } else {
        res.status(404).res.send()
    }
})

minionsRouter.get('/', (req, res, next)=>{
    res.send(getAllFromDatabase('minions'))
})

minionsRouter.get('/:minionId', (req, res, next)=>{
    console.log(getFromDatabaseById('minions', req.params.minionId))
    res.send(getFromDatabaseById('minions', req.params.minionId))
} )

minionsRouter.post('/', (req, res, next)=>{
    const minionStats = req.query
    
    const newMinion = addToDatabase('minions', minionStats)

    console.log(newMinion)
    if(newMinion) {
        res.send(newMinion)
    } else {
        res.status(400).send()
    }
})

minionsRouter.put('/:minionId', (req, res, next)=>{
    const minionStats = req.query
    minionStats.id = req.minionId
    
    const updatedMinion = updateInstanceInDatabase('minions', minionStats)

    if(updatedMinion) {
        res.send(updatedMinion)
    } else {
        res.status(400).send()
    }
})

minionsRouter.delete('/:minionId', (req, res, next)=>{
    const deletedMinion = deleteFromDatabasebyId('minions', req.minionId)
    console.log(deletedMinion)
    if(deletedMinion) {
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})

module.exports = minionsRouter;

