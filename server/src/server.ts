import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import todosRouter from "./routes/todos.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("/test", (req, res) => res.send("Hello"));

app.use("/api/todos", todosRouter);

//
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
