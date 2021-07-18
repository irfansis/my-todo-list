const db = require("../models");
const ToDo = db.todo;

// Create and Save a new ToDo
exports.create = (req, res) => {
  // Validate request

  console.log("Creating a record");
  console.log(req.body);
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const todo = new ToDo({
    title: req.body.title,
  });

  // Save ToDo in the database
  todo
    .save(todo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ToDo."
      });
    });
};

// Retrieve all ToDos from the database.
exports.findAll = (req, res) => {
  console.log('Getting All Records');
  
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  ToDo.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ToDos."
      });
    });
};

// Find a single ToDo with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ToDo.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found ToDo with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving ToDo with id=" + id });
    });
};


// Update a ToDo by the id in the request
exports.update = (req, res) => {
  console.log("Updating a record");
  console.log(req.body);
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  ToDo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update ToDo with id=${id}. Maybe ToDo was not found!`
        });
      } else res.send({ message: "ToDo was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating ToDo with id=" + id
      });
    });
};

// Delete a ToDo with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ToDo.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete ToDo with id=${id}. Maybe ToDo was not found!`
        });
      } else {
        res.send({
          message: "ToDo was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete ToDo with id=" + id
      });
    });
};

