module.exports = app => {
  const todos = require("../controllers/todo.controller.js");

  var router = require("express").Router();

  // Create a new ToDo
  router.post("/", todos.create);

  // Retrieve all todos
  router.get("/", todos.findAll);

  // Retrieve a single ToDo with id
  router.get("/:id", todos.findOne);
   
  // Update a ToDo with id
  router.put("/:id", todos.update);

  // Delete a ToDo with id
  router.delete("/:id", todos.delete);
  
  app.use("/api/todo", router);
};
