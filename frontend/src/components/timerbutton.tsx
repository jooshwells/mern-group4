//
import { Button } from "./ui/button";
import { AlarmClock } from "lucide-react";

function TimerButton() {
  return (
    <Button className="bg-amber-600 absolute rounded-4xl bottom-10 scale-150">
      <AlarmClock />
    </Button>
  );
}

export default TimerButton;
