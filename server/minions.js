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
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.param('workId', (req, res, next, id) => {
  const work = getFromDatabaseById('work', id);
  if (work) {
    req.work = work;
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

// ---> Bonus

minionsRouter.get('/:minionId/work', (req, res, next) => {
  const work = getAllFromDatabase('work').filter(singleWork => {
    return singleWork.minionId === req.minion.id
  })
  res.send(work)
})

minionsRouter.post('/:minionId/work', (req, res, next) => {
  const newWork = req.body;
  newWork.minionId = req.params.minionId
  const createdWork = addToDatabase('work', newWork);
  res.status(201).send(createdWork);
})

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  if (req.work.minionId !== req.minion.id) {
    res.status(400).send();
    return;
  }

  const updatedWork = updateInstanceInDatabase('work', req.body)
  res.send(updatedWork);
})

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
  const deletedWork = deleteFromDatabasebyId('work', req.params.workId);
  if (deletedWork) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
})