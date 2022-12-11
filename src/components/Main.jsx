import { useState } from "react";
import CONFIG from "../config";
import Select from "./Select";

export default function Main() {
  const [selectedSport, setSelectedSport] = useState("");
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
          setSelectedSport(selectedSport.sport);
          setButtons(selectedSport.buttons);
        }}
      />
    </main>
  );
}
