// index.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getNotes, getNote, createNote, updateNote, deleteNote } from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/", async (req, res) => {
  let notes = await getNotes();
  res.send(notes);
  // res.send("Hello from Express!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
