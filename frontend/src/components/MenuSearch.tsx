import React from "react";
import { Input } from "@/components/ui/input";
import TimerButton from "./timerbutton";

export default function MenuSearch({ children }: { children?: React.ReactNode }) {
  return (
    <div className="h-[85%] relative flex border border-amber-300 w-[240px] rounded-lg justify-center items-start pt-2 bg-background">
      <form className="flex w-full justify-center">
        <Input
          className="w-[90%] h-[3%] bg-transparent border border-amber-300 rounded-lg text-center placeholder:text-muted-foreground text-current text-sm p-0"
          placeholder="Search"
          aria-label="Search"
        />
      </form>

      <div className="absolute bottom-2 left-0 w-full flex justify-center">
        {children ?? <TimerButton />}
      </div>
    </div>
  );
}
