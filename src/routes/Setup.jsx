import Button from "../components/Buttons/Button";
import { NumericalInput, Select } from "../components/Form";
import CONFIG from "../config";

export default function Setup({ setButtons, setPeriods, setTimePerPeriod }) {
  return (
    <>
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

      <NumericalInput
        id="periods"
        placeholder="Number of Periods"
        handleBlur={(e) => {
          setPeriods(e.target.value);
        }}
      />

      <NumericalInput
        id="time"
        placeholder="Time per period? (minutes)"
        handleBlur={(e) => {
          setTimePerPeriod(e.target.value);
        }}
      />

      <Button
        colorClass="bg-green-500"
        text="Go!"
        handleClick={() => {
          console.log("Go!");
        }}
      />
    </>
  );
}
