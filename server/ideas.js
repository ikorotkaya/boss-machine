const express = require("express");

const ideasRouter = express.Router();
module.exports = ideasRouter;

const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

ideasRouter.param('ideaId', (req, res, next, id) => {
  // console.log("--> req.body: ", req.body)
  const idea = getFromDatabaseById('ideas', id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'))
})

ideasRouter.post('/', (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
})

ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea);
})

ideasRouter.put('/:ideaId', (req, res, next) => {
  const updateidea = updateInstanceInDatabase('ideas', req.body)
  res.send(updateidea)
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
  const deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (deletedIdea) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
})