import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Button from "../components/Buttons/Button.jsx";
import Buttons from "../components/Buttons/Buttons.jsx";
import { HomeAwaySwitch } from "../components/Form";
import Scoreboard from "../components/Scoreboard";

export default function Display({ buttons, periods, timePerPeriod }) {
  const [homeAway, setHomeAway] = useState("away");
  const [awayScore, setAwayScore] = useState(0);
  const [homeScore, setHomeScore] = useState(0);
  const [currentPeriod, setCurrentPeriod] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(
    // Seconds to minutes
    timePerPeriod * 60
  );
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0) {
      const intervalId = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [timeRemaining, isTimerRunning]);

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
        timeRemaining={timeRemaining}
        currentPeriod={currentPeriod}
      />

      <div className="flex gap-x-8">
        <Button
          colorClass="bg-green-500"
          text="Start"
          handleClick={() => {
            setIsTimerRunning((prev) => !prev);
          }}
        />

        <Button
          colorClass="bg-orange-500"
          text="Stop"
          handleClick={() => {
            setIsTimerRunning((prev) => !prev);
          }}
        />

        <Button
          colorClass="bg-yellow-700"
          text="Next Period"
          handleClick={() => {
            console.log("Next Period");
          }}
        />

        <Button
          colorClass="bg-red-500"
          text="Reset Board"
          handleClick={() => {
            console.log("Reset Board");
          }}
        />
      </div>
    </>
  );
}

Display.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.number).isRequired,
  periods: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  timePerPeriod: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
};
