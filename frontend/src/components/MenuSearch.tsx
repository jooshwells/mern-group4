//
import TimerButton from "./timerbutton";

function MenuSearch() {
  return (
    <div className="h-[85%] relative flex border border-amber-300 w-[105] rounded-lg justify-center ">
      <form className=" top-5 flex relative w-full justify-center ">
        <input
          className=" w-[90%] h-[3%] text-center border border-amber-300 rounded-lg "
          placeholder="Search"
        ></input>
      </form>
      <TimerButton />
    </div>
  );
}

export default MenuSearch;
