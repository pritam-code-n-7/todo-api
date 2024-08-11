import { model, Schema } from "mongoose";

const priceSchema = new Schema({
  highPrice: {
    type: Number,
    default: 1,
  },
  midPrice: {
    type: Number,
    default: 1,
  },
  lowPrice: {
    type: Number,
    default: 1,
  },
});

const todoSchema = new Schema(
  {
    task: {
      type: String,
      required: [true, "task is required"],
    },
    price: [priceSchema],
    completed: {
      type: Boolean,
      default: false,
      required: [true, "completed is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const todos = model("todos", todoSchema);
