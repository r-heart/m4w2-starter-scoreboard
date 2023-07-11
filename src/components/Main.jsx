import { useState } from "react";
import Buttons from "./Buttons/Buttons";
import { HomeAwaySwitch } from "./Form";
import Scoreboard from "./Scoreboard";

export default function Main() {
  const [buttons, setButtons] = useState([]);
  const [homeAway, setHomeAway] = useState("away");
  const [awayScore, setAwayScore] = useState(0);
  const [homeScore, setHomeScore] = useState(0);
  const [periods, setPeriods] = useState(2);
  const [currentPeriod, setCurrentPeriod] = useState(1);
  const [minutes, setMinutes] = useState(15);

  return (
    <main className="flex flex-col items-center gap-y-4 ">
      <HomeAwaySwitch
        handleToggle={() => {
          setHomeAway((prev) => (prev === "home" ? "away" : "home"));
        }}
      />

      <Buttons
        buttons={buttons}
        handleClick={(e) => {
          if (homeAway === "home") {
            setHomeScore((prev) => prev + Number(e.target.dataset.count));
          } else {
            setAwayScore((prev) => prev + Number(e.target.dataset.count));
          }
        }}
      />

      <Scoreboard
        homeScore={homeScore}
        awayScore={awayScore}
        minutes={minutes}
        currentPeriod={currentPeriod}
      />
    </main>
  );
}
