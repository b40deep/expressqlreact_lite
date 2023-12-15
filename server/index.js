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
app.use(express.json());

// Routes
app.get("/notes", async (req, res) => {
  let notes = await getNotes();
  res.send(notes);
  // res.send("Hello from Express!");
});

app.get("/notes/:id", async (req, res) => {
  let note = await getNote(req.params.id);
  res.send(note);
  // res.send("Hello from Express!");
});

app.delete("/notes/:id", async (req, res) => {
  let notes = await deleteNote(req.params.id);
  res.status(200).send(notes);
  // res.send("Hello from Express!");
});

app.post("/notes", async (req, res) => {
  let { title, contents } = req.body;
  const notes = await createNote(title, contents);
  res.status(201).send(notes);
  // res.send("Hello from Express!");
});

app.put("/notes", async (req, res) => {
  let { id, title, contents } = req.body;
  const notes = await updateNote(id, title, contents);
  res.status(200).send(notes);
  // res.send("Hello from Express!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
