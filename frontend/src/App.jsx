import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "./components/Header.jsx";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function App() {
  const [editMode, setEditMode] = useState(false);
  const [list, setList] = useState([]);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [userId, setUserId] = useState("");
  const inputRef = useRef(null);

  const showTodos = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/show/todos");
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addtodo = async (e) => {
    e.preventDefault();
    try {
      const add = await axios.post("http://localhost:3000/api/create/list", {
        firstName: FirstName,
        lastName: LastName,
      });
      if (add.status === 200) {
        setFirstName("");
        setLastName("");
        showTodos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const todoDelete = await axios.delete(
        `http://localhost:3000/api/delete/todo/${id}`
      );
      if (todoDelete.status === 200) {
        showTodos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // populate single todo in the form
  const showSingleTodo = async (id) => {
    setEditMode(true);

    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/show/todos/${id}`
      );
      setFirstName(data.map((d) => d.firstName));
      setLastName(data.map((d) => d.lastName));
      setUserId(data.map((d) => d.id));
      // console.log(data.map((d) => d.id));
    } catch (error) {
      console.log(error);
    }
  };

  //edit todo
  const editTodo = async (e) => {
    e.preventDefault();

    try {
      const edit = await axios.put(
        `http://localhost:3000/api/update/todo/${userId}`,
        {
          firstName: FirstName,
          lastName: LastName,
        }
      );
      // console.log(edit)

      if (edit.status === 200) {
        setEditMode(false);
        setFirstName("");
        setLastName("");
        showTodos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showTodos();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="container">
      <Header />
      <div>
        <form className="form-div" onSubmit={editMode ? editTodo : addtodo}>
          <input
            ref={inputRef}
            onChange={(e) => setFirstName(e.target.value)}
            value={FirstName}
            type="text"
            name="firstName"
            placeholder="First Name"
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            value={LastName}
            type="text"
            name="lastName"
            placeholder="Last Name"
          />
          {editMode ? (
            <button className="form-btn-edit" type="submit">
              Edit
            </button>
          ) : (
            <button className="form-btn-add" type="submit">
              + Add
            </button>
          )}
        </form>
      </div>
      <table className="table">
        <thead className="table">
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {list &&
            list.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.firstName}</td>
                <td>{d.lastName}</td>
                <td
                  onClick={() => showSingleTodo(d.id)}
                  style={{
                    color: "green",
                    cursor: "pointer",
                    fontSize: "30px",
                  }}
                >
                  <CiEdit />
                </td>
                <td
                  onClick={() => deleteTodo(d.id)}
                  style={{
                    color: "red",
                    cursor: "pointer",
                    fontSize: "30px",
                  }}
                >
                  <MdDeleteForever />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
