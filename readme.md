# Create Database Connection File
```
import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password1: "******",
  database: "todolist",
});

db.connect((error) => {
  if (error) throw error;
  console.log("DB connected");
});

export default db;

```