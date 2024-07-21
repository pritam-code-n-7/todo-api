import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { todos } from "./model/todos.model.js";
import { connectDB } from "./config/db.conn.js";

//mongodb connection
connectDB();

//instance for app
const app = express();
app.use(express.json());

dotenv.config();
//app.use(express.urlencoded({ extended: true }));

//middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

//get request for testing
app.get("/", (req, res) => {
  res.send("This is for tesing purpose only.");
});

//post request
app.post("/api/todos", async (req, res) => {
  try {
    const { task } = req.body;
    if (!task.trim()) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "This field is required.",
      });
    }
    await todos.create({ task });
    return res.status(201).json({
      success: true,
      status: 201,
      message: "Congratulation! your task is now created.",
    });
  } catch (error) {
    console.error(`Error:${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Interal server error, please try again after sometimes.",
    });
  }
});

//get request for all tasks

app.get("/api/todos", async (req, res) => {
  try {
    const data = await todos.find();
    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "tasks not found.",
      });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(`Error:${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Interal server error, please try again after sometimes.",
    });
  }
});

//get request for one task
app.get("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await todos.findById(id);
    if (!data) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "tasks not found.",
      });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(`Error:${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Interal server error, please try again after sometimes.",
    });
  }
});

//patch request

app.patch("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await todos.findById(id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "task not found",
      });
    }
    const updatedTask = await todos.findByIdAndUpdate(
      id,
      { completed: !todo.completed },
      { new: true }
    );
    console.log(updatedTask);
    return res.status(200).json({
      success: true,
      status: 200,
      message: "task partially updated",
      updatedTask,
    });
  } catch (error) {
    console.error(`Error:${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Interal server error, please try again after sometimes.",
    });
  }
});

//delete request
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await todos.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Task deleted",
    });
  } catch (error) {
    console.error(`Error:${error.message}`);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Interal server error, please try again after sometimes.",
    });
  }
});

//port
app.listen(process.env.PORT, () => {
  console.log(`server running on port http://localhost:${process.env.PORT}`);
});
