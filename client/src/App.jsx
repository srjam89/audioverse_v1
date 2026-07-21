import "./index.css";
import Header from "./header";
import Hero from "./components/hero";

function App() {
  return (
    <section className="mx-auto min-h-dvh w-[calc(100%-2rem)] max-w-[1700px]">
      <Header />
      <Hero />
    </section>
  );
}

export default App;
