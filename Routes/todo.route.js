const express = require("express");
const { auth } = require("../MiddleWare/auth.middleware");
const { TodoModel } = require("../Models/todo.model");

const todoRouter = express.Router();

todoRouter.use(auth);

todoRouter.post("/create", async(req, res) => {
  const { title, body } = req.body;
  try {
    const todo = await TodoModel(req.body)
    todo.title = title
    todo.body = body
    await todo.save()
    res.status(200).send({"msg" : "New todo addd Successfuly"})
  } catch (error) {
    res.status(400).send({"msg" :"Error adding todo"})
  }
});

todoRouter.get("/", async(req, res) => {
  try {
    const todos = await TodoModel.find({username : req.body.username})
    res.status(200).send(todos)
  } catch (error) {
    res.status(400).send({"msg" : "error durin getin todos"})
  }
})


module.exports = {
    todoRouter
}


