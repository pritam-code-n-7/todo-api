import { model, Schema } from "mongoose";

const todoSchema = new Schema(
  {
    task: {
      type: String,
      required: [true, "task is required"],
    },
    completed: {
      type: Boolean,
      default: false,
      required: [true, "completed is required"],
    },
    dish:{
      type:String,
      default:"lol"
    }
  },
  {
    timestamps: true,
  }
);

export const todos = model("todos", todoSchema);
