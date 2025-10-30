import {
  useEffect,
  useRef,
  useState,
  type MouseEventHandler,
  type ReactEventHandler,
} from "react";
import { Button } from "./ui/button";
import { GripVerticalIcon, Icon } from "lucide-react";
import Draggable, { DraggableCore } from "react-draggable";

// Made a type so typescript would stop freaking out
type timerProps = {
  pomoTime?: number;
  shortTime?: number;
  longTime?: number;
};

// Default timer. You can change them easily when inserting the component
// eg. <Timer pomoTime={30 * 60} />
// This changes the pomodoro countdown time to 30 minutes.
export function Timer({
  pomoTime = 25 * 60,
  shortTime = 5 * 60,
  longTime = 15 * 60,
}: timerProps) {
  // Define states for the current time and whether the timer has been started.
  const [currentTime, setCurrentTime] = useState<number>(pomoTime);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  // State for the mode, whether pomodoro, shortbreak, or longbreak.
  const [currentMode, setCurrentMode] = useState<string>("pomodoro");

  const nodeRef = useRef(null);

  // Every time that the currentTime or timerRunning state changes, call this function
  useEffect(() => {
    // Set initial time on page load or when timer hits 0
    if (!timerRunning) {
      setCurrentTime(currentTime);
    }
    // Start countdown and reset timer when time hits 0
    else {
      const countdownIterval = setInterval(() => {
        setCurrentTime(currentTime - 1);
        if (currentTime == 0) {
          setTimerRunning(false);
          switch (currentMode) {
            case "pomodoro":
              setCurrentTime(pomoTime);
              break;
            case "shortbreak":
              setCurrentTime(shortTime);
              break;
            case "longbreak":
              setCurrentTime(longTime);
              break;
            default:
              break;
          }
        }
      }, 1000);
      return () => clearInterval(countdownIterval);
    }
  }, [timerRunning, currentTime, currentMode]);

  // Change timer from start to stop, or stop to start
  const handleStartButton = () => {
    setTimerRunning(!timerRunning);
  };

  // handlers for different modes
  const handlePomodoroButton = () => {
    if (currentMode != "pomodoro") {
      setCurrentMode("pomodoro");
      setCurrentTime(pomoTime);
      setTimerRunning(false);
    }
  };

  const handleShortBreakButton = () => {
    if (currentMode != "shortbreak") {
      setCurrentMode("shortbreak");
      setCurrentTime(shortTime);
      setTimerRunning(false);
    }
  };

  const handleLongBreakButton = () => {
    if (currentMode != "longbreak") {
      setCurrentMode("longbreak");
      setCurrentTime(longTime);
      setTimerRunning(false);
    }
  };

  const handleNextButton = () => {
    switch (currentMode) {
      case "pomodoro":
        setCurrentMode("shortbreak");
        setCurrentTime(shortTime);
        setTimerRunning(false);
        break;
      case "shortbreak":
        setCurrentMode("longbreak");
        setCurrentTime(longTime);
        setTimerRunning(false);
        break;
      case "longbreak":
        setCurrentMode("pomodoro");
        setCurrentTime(pomoTime);
        setTimerRunning(false);
        break;
      default:
        break;
    }
  };

  return (
    // <Draggable handle=".handle" nodeRef={nodeRef}>
    <div ref={nodeRef} className={`z-40 m-0.5 flex flex-row`}>
      <div className="flex w-md my-0 opacity-95 flex-col">
        <div className="flex flex-1 flex-row">
          <Button
            variant={currentMode == "pomodoro" ? "default" : "ghost"}
            onClick={handlePomodoroButton}
            className={`${
              currentMode == "pomodoro" ? "flex-2 font-bold" : "flex-1"
            } px-0 h-6 text-xs rounded-none`}
          >
            Pomodoro
          </Button>
          <Button
            className={`${
              currentMode == "shortbreak" ? "flex-2 font-bold" : "flex-1"
            }
           px-0 h-6 text-xs  rounded-none`}
            variant={currentMode == "shortbreak" ? "default" : "ghost"}
            onClick={handleShortBreakButton}
          >
            Short Break
          </Button>
          <Button
            className={`${
              currentMode == "longbreak" ? "flex-2 font-bold" : "flex-1"
            } px-0 h-6 text-xs rounded-none`}
            variant={currentMode == "longbreak" ? "default" : "ghost"}
            onClick={handleLongBreakButton}
          >
            Long Break
          </Button>
        </div>
        <div className="flex flex-6 flex-row">
          <Button
            variant={timerRunning ? "destructive" : "default"}
            onClick={handleStartButton}
            className="flex-1 rounded-none"
          >
            {timerRunning ? "Stop" : "Start"}
          </Button>
          <h1 className="w-28 text-center  bg-accent m-auto px-5 font-bold text-3xl">
            {Math.floor(currentTime / 60)}:
            {String(currentTime % 60).padStart(2, "0")}
          </h1>
          <Button
            onClick={handleNextButton}
            className="flex-1 w-20 rounded-none"
            variant="default"
          >
            Next
          </Button>
        </div>
      </div>
      {/* <div className="handle z-50 hover:cursor-grab bg-accent flex">
        <GripVerticalIcon className="my-auto" />
      </div> */}
    </div>
    // </Draggable>
  );
}
