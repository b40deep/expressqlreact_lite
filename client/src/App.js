import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([
    { id: "ABBA1", title: "ABBA", contents: "ABBA", created: "ABBA" },
    { id: "ABBA2", title: "ABBA", contents: "ABBA", created: "ABBA" },
    { id: "ABBA3", title: "ABBA", contents: "ABBA", created: "ABBA" },
    { id: "ABBA4", title: "ABBA", contents: "ABBA", created: "ABBA" },
  ]);

  const [note, setNote] = useState({});
  const [noteId, setNoteId] = useState("1");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    // Fetch data from Express backend
    fetch(`${process.env.REACT_APP_URL}:5000/notes`)
      .then((response) => response.json()) // Assuming your backend returns JSON
      .then((result) => {
        console.log(Array.isArray(result)); // Check if result is an array
        console.log(result);

        // Assuming result is an array, update the state with the array
        setData(result);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  // Function to create a new note
  const createNote = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}:5000/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, contents }),
      });

      const updatedNotes = await response.json();
      console.log("New Note:", updatedNotes);
      setData(updatedNotes);

      // You can update the state or perform additional logic here
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  // Function to fetch a single note
  const fetchSingleNote = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}:5000/notes/${noteId}`
      );
      const singleNote = await response.json();
      console.log("Single Note:", singleNote);

      setNote(singleNote);
      // You can update the state or perform additional logic here
    } catch (error) {
      console.error("Error fetching single note:", error);
    }
  };

  // Function to update a note
  const updateNote = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}:5000/notes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: noteId, title, contents }),
      });

      const updatedNotes = await response.json();
      console.log(
        "Updated Notes:",
        JSON.stringify({ id: noteId, title, contents })
      );
      console.log("Updated Notes:", updatedNotes);

      // You can update the state or perform additional logic here
      setData(updatedNotes);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Function to delete a note
  const deleteNote = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}:5000/notes/${noteId}`,
        {
          method: "DELETE",
        }
      );

      const updatedNotes = await response.json();
      console.log("Note deleted successfully");

      console.log("Updated Notes:", updatedNotes);

      // You can update the state or perform additional logic here
      setData(updatedNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div>
          <h3>Create a New Note</h3>

          {/* Create Note */}
          <label>Note title</label>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Note contents</label>
          <textarea
            placeholder="Contents"
            onChange={(e) => setContents(e.target.value)}
          />
          <button onClick={createNote}>Create Note</button>
        </div>

        <h3>Fetch a Single Note</h3>
        {/* Fetch Single Note */}
        <input
          type="text"
          placeholder="Note ID"
          onChange={(e) => setNoteId(e.target.value)}
        />
        <button onClick={() => fetchSingleNote()}>Fetch Single Note</button>
        {note && (
          <p>
            {note.id}:{note.title} {note.contents}
          </p>
        )}

        <h3>Update a Single Note</h3>
        {/* Update Note */}
        <input
          type="text"
          placeholder="Note ID"
          onChange={(e) => setNoteId(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="New Contents"
          onChange={(e) => setContents(e.target.value)}
        />
        <button onClick={() => updateNote()}>Update Note</button>

        <h3>Delete a Single Note</h3>
        {/* Delete Note */}
        <input
          type="text"
          placeholder="Note ID"
          onChange={(e) => setNoteId(e.target.value)}
        />
        <button onClick={() => deleteNote()}>Delete Note</button>

        <div>
          <h3>Listed notes</h3>
          {/* {data && <p>Data from Express: {JSON.stringify(data)}</p>} */}
          <ul>
            {data.map((note) => (
              <li key={note.id}>
                <p>
                  <small>
                    <i>{note.title}</i>
                    {" " + note.contents + " "}
                    _created: {new Date(note.created).toLocaleString()}
                  </small>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
