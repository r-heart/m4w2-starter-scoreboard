import { useState } from "react";
import Button from "./Button";

const BUTTONS = [1, 2, 3, 4, 5];

export default function Main() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex flex-col items-center gap-y-4 ">
      <div className="flex gap-x-4">
        {BUTTONS.map((num) => (
          <Button text={num} key={num} />
        ))}
      </div>
      <p className="text-center text-5xl font-black">{count}</p>
    </main>
  );
}
