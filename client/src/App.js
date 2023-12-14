import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    // Fetch data from Express backend
    fetch("http://localhost:5000")
      .then((response) => response.text())
      .then((result) => setData(result))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div>
          <h1>React App</h1>
          <p>Data from Express: {data}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
