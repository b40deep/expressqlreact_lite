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

  useEffect(() => {
    // Fetch data from Express backend
    fetch("http://localhost:5000")
      .then((response) => response.json()) // Assuming your backend returns JSON
      .then((result) => {
        console.log(Array.isArray(result)); // Check if result is an array
        console.log(result);

        // Assuming result is an array, update the state with the array
        setData(result);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  async function createNote(e) {
    e.preventDefault();
    alert("works!");
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div>
          <h1>Create a New Note</h1>

          <label htmlFor="noteTitle">Title:</label>
          <input type="text" id="noteTitle" placeholder="Enter note title" />

          <label htmlFor="noteContents">Contents:</label>
          <textarea
            id="noteContents"
            placeholder="Enter note contents"
          ></textarea>

          <button onClick={createNote}>Create Note</button>
        </div>
        <div>
          <h1>Listed notes</h1>
          {/* {data && <p>Data from Express: {JSON.stringify(data)}</p>} */}
          <ul>
            {data.map((note) => (
              <li key={note.id}>
                <p>
                  <strong>{note.title}</strong>
                  {" " + note.contents + " "}
                  <small>
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
