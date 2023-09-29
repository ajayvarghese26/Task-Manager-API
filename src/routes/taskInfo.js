const taskRoutes = require("express").Router();
const tasks = require("../task.json");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const validator = require("../helper/validator");

taskRoutes.use(bodyParser.urlencoded({ extended: false }));
taskRoutes.use(bodyParser.json());

//To get all task details
taskRoutes.get("/", (req, res) => {
  res.status(200).send(tasks);
});

//To get task details by task id
taskRoutes.get("/:id", (req, res) => {
  let tasklist = tasks.Tasks;
  let id = req.params.id;
  let result = tasklist.filter((val) => val.id === id);
  if (result.length !== 0) {
    res.status(200).send(result);
  } else {
    res.status(404).send(`Task details not available for the id ${id}`);
  }
});

//To create a new task
taskRoutes.post("/", (req, res) => {
  let taskDetails = req.body;
  let writepath = path.join(__dirname, "..", "task.json");
  let taskData = tasks;
  if (validator.taskInfoValidator(taskDetails).status) {
    taskData.Tasks.push(taskDetails);
    fs.writeFileSync(writepath, JSON.stringify(taskData), {
      encoding: "utf-8",
      flag: "w",
    });
    res.status(200).send("Task is added successfully");
  } else {
    res.status(400).send("Task details not added as it is not in the required format");
  }
});

//To update a task with task id
taskRoutes.post("/:id", (req, res) => {
  let taskDetails = req.body;
  let taskData = tasks;
  let id = req.params.id;
  let result = taskData.Tasks.filter((val) => val.id === id);
  if (result && result.length === 0) {
    res.status(404).send(`Task not updated as the task id ${id} is missing`);
  } else {
    if (validator.taskInfoValidator(taskDetails).status) {
      objIndex = taskData.Tasks.findIndex((obj) => obj.id == id);
      taskData.Tasks[objIndex].Description = taskDetails.Description;
      taskData.Tasks[objIndex].Flag = taskDetails.Flag;
      taskData.Tasks[objIndex].Title = taskDetails.Title;
      let writepath = path.join(__dirname, "..", "task.json");
      fs.writeFileSync(writepath, JSON.stringify(taskData), {
        encoding: "utf-8",
        flag: "w",
      });
      res.status(200).send("Task details updated successfully");
    } else {
      res.status(400).send("Task details not updated as it is not in the required format");
    }
  }
});

//To delete a task by its id
taskRoutes.delete("/:id", (req, res) => {
  let id = req.params.id;
  let taskData = tasks;
  let result = taskData.Tasks.filter((val) => val.id === id);
  if (result && result.length === 0) {
    res.status(404).send(`Task not deleted as the task id ${id} is missing`);
  } else {
    objIndex = taskData.Tasks.findIndex((obj) => obj.id == id);
    let modifiedTask = taskData.Tasks.splice(objIndex, 1);
    let writepath = path.join(__dirname, "..", "task.json");
    fs.writeFileSync(writepath, JSON.stringify(taskData), {
      encoding: "utf-8",
      flag: "w",
    });
    res.status(200).send(`Task id ${id} deleted successfully`);
  }
});

module.exports = taskRoutes;
