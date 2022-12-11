import { useState } from "react";
import CONFIG from "../config";
import Buttons from "./Buttons/Buttons";
import Select from "./Select";

export default function Main() {
  const [buttons, setButtons] = useState([]);

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

      <Buttons buttons={buttons} handleClick={() => {}} />
    </main>
  );
}
