const express = require("express");

const minionsRouter = express.Router();
module.exports = minionsRouter;

const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

minionsRouter.param('minionId', (req, res, next, id) => {
  // console.log("--> req.body: ", req.body)
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'))
})

minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
})

minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
})

minionsRouter.put('/:minionId', (req, res, next) => {
  // console.log("Request body: ", req.body)
  const updateMinion = updateInstanceInDatabase('minions', req.body)
  res.send(updateMinion)
})

minionsRouter.delete('/:minionId', (req, res, next) => {
  const deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
  if (deletedMinion) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
})