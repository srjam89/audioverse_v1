import { useEffect } from "react";

import "./index.css";
import api from "./services/api";
import Header from "./header";
import Hero from "./components/hero";

function App() {
  useEffect(() => {
    api
      .get("/")
      .then(() => console.log("Connected successfully"))
      .catch((error) => console.error("API connection failed:", error));
  }, []);

  return (
    <section className="mx-auto min-h-screen w-[calc(100%-2rem)] max-w-[1700px]">
      <Header />
      <Hero />
    </section>
  );
}

export default App;
