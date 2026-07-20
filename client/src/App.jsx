import { useEffect } from "react";

import "./index.css";
import api from "./services/api";
import Header from "./header";

function App() {
  useEffect(() => {
    api
      .get("/")
      .then(() => console.log("Connected successfully"))
      .catch((error) => console.error("API connection failed:", error));
  }, []);

  return (
    <section className="mx-auto min-h-screen w-full max-w-[1400px]">
      <Header />
    </section>
  );
}

export default App;
