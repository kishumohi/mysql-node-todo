import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

// import routes
import todos from "./routes/todosRoutes.js";

// middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "5mb" }));
app.use(
  express.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(cors());

// ROUTES middleware
app.use("/api", todos);

//port
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
