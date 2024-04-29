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

    let nextMinionId = 11

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
    
    // {
    //     name: 'TEST Schuster III',
    //     title: 'Corporate Markets Specialist',
    //     weaknesses: 'Cannot do enterprise capability, Will not build bleeding-edge conglomeration, Will not build viral portal, too multi-byte',
    //     salary: 40000
    //   }
    const newMinion = addToDatabase('minions', minionStats)

    console.log(newMinion)
    if(newMinion) {
        res.send(newMinion)
    } else {
        res.status(400).send()
    }
})

module.exports = minionsRouter;

