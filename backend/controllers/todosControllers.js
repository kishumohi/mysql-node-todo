import db from "../db/database.js";

// createdb
export const createDB = (req, res) => {
  const createDBqury = "CREATE DATABASE todolist";
  db.query(createDBqury, (err, result) => {
    if (err) throw err;
    return res.status(201).json("DB Created");
  });
};
// create table
export const createTable = (req, res) => {
  const createTable =
    "CREATE TABLE todolist1(id int AUTO_INCREMENT, firstName VARCHAR(255), lastName VARCHAR(255), PRIMARY KEY(id))";
  db.query(createTable, (err, result) => {
    if (err) throw err;
    return res.status(201).json("TABLE CREATED");
  });
};

// create list
export const createList = (req, res) => {
  const { firstName, lastName } = req.body;
  const createList = "INSERT INTO todolist1 (firstName,lastName) VALUES ?";
  let values = [[`${firstName}`, `${lastName}`]];

  db.query(createList, [values], (err, result) => {
    if (err) throw err;
    return res.status(200).json(result);
  });
};

//show todos
export const showTodos = (req, res) => {
  const showTodos = "SELECT * FROM todolist1";
  db.query(showTodos, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result);
  });
};

//show single todos
export const showSingleTodos = (req, res) => {
  const showSingleTodos = `SELECT * FROM todolist1 where id=${req.params.id}`;
  db.query(showSingleTodos, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result);
  });
};

// show update todos
export const updateTodo = (req, res) => {
  const { firstName, lastName } = req.body;
  const todoUpdate = `UPDATE todolist1 SET ? where id=${req.params.id}`;
  db.query(todoUpdate, { firstName, lastName }, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result);
  });
};

// delete single todo

export const deleteTodo = (req, res) => {
  const deleteTodo = `DELETE FROM todolist1 where id=${req.params.id}`;

  db.query(deleteTodo, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json({ data: "todo deleted" });
  });
};
