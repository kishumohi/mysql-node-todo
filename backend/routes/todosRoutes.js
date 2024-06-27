import express from "express";
import {
  createDB,
  createList,
  createTable,
  deleteTodo,
  showSingleTodos,
  showTodos,
  updateTodo,
} from "../controllers/todosControllers.js";

const router = express.Router();

router.get("/create/migratedb", createDB);
router.get("/create/migratetable", createTable);
router.post("/create/list", createList);
router.get("/show/todos", showTodos);
router.get("/show/todos/:id", showSingleTodos);
router.put("/update/todo/:id", updateTodo);
router.delete("/delete/todo/:id", deleteTodo);

export default router;
