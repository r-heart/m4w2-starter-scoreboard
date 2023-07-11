import Display from "./routes/Display";
import Setup from "./routes/Setup";

function App() {
  return (
    // using shorthand for a React Fragment
    <>
      <h1 className="my-4 text-center text-3xl font-extrabold">
        Scoreboard App
      </h1>
      <main>
        <Display />
        <Setup />
      </main>
    </>
  );
}

export default App;
