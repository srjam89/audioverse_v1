import { useEffect } from "react";

import "./App.css";
import api from "./services/api";

function App() {
  useEffect(() => {
    api
      .get("/")
      .then(() => console.log("Connected successfully"))
      .catch((error) => console.error("API connection failed:", error));
  }, []);

  return (
    <section id="center">
      <h1>hello world</h1>
      <section id="spacer"></section>
    </section>
  );
}

export default App;
