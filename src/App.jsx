import { useState } from "react";
import Display from "./routes/Display";
import Setup from "./routes/Setup";

function App() {
  const [buttons, setButtons] = useState([]);
  const [gameStart, setGameStart] = useState(false);
  const [periods, setPeriods] = useState(1);
  const [timePerPeriod, setTimePerPeriod] = useState(0);

  return (
    // using shorthand for a React Fragment
    <>
      <h1 className="my-4 text-center text-3xl font-extrabold">
        Scoreboard App
      </h1>
      <main className="flex flex-col items-center gap-y-4">
        {gameStart ? (
          <Display
            buttons={buttons}
            periods={periods}
            timePerPeriod={timePerPeriod}
          />
        ) : (
          <Setup
            setButtons={setButtons}
            setPeriods={setPeriods}
            setTimePerPeriod={setTimePerPeriod}
            setGameStart={setGameStart}
          />
        )}
      </main>
    </>
  );
}

export default App;
