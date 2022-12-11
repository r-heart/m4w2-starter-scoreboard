import { useState } from "react";
import CONFIG from "../config";
import Buttons from "./Buttons/Buttons";
import Select from "./Select";
import HomeAwaySwitch from "./HomeAwaySwitch";

export default function Main() {
  const [buttons, setButtons] = useState([]);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [homeAway, setHomeAway] = useState("away");

  return (
    <main className="flex flex-col items-center gap-y-4 ">
      <Select
        id="sport-select"
        options={CONFIG.map((sport) => sport.sport)}
        handleChange={(e) => {
          const selectedSport = CONFIG.find(
            (sport) => sport.sport === e.target.value
          );
          setButtons(selectedSport.buttons);
        }}
      />

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

      <section className="flex flex-row gap-x-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl">Home</h2>
          <p className="text-4xl">{homeScore}</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl">Away</h2>
          <p className="text-4xl">{awayScore}</p>
        </div>
      </section>
    </main>
  );
}
