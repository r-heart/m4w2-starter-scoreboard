import PropTypes from "prop-types";
import { useState } from "react";
import Buttons from "../components/Buttons/Buttons";
import { HomeAwaySwitch } from "../components/Form";
import Scoreboard from "../components/Scoreboard";

export default function Display({ buttons, periods, timePerPeriod }) {
  const [homeAway, setHomeAway] = useState("away");
  const [awayScore, setAwayScore] = useState(0);
  const [homeScore, setHomeScore] = useState(0);
  const [currentPeriod, setCurrentPeriod] = useState(1);
  const [minutes, setMinutes] = useState(15);

  // TODO: Manage the time and current period, bring in color buttons

  return (
    <>
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
    </>
  );
}

Display.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.number).isRequired,
  periods: PropTypes.PropTypes.number.isRequired,
  timePerPeriod: PropTypes.number.isRequired,
};
