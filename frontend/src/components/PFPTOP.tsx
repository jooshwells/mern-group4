import { Skeleton } from "@/components/ui/skeleton";

//
function Pfptop() {
  return (
    <div className="w-full justify-center text-center">
      <div className="flex justify-center">
        <Skeleton className="h-[150px] w-[150px] rounded-full mb-5" />
      </div>
      <p>Username</p>
      <p>Email</p>
    </div>
  );
}

export default Pfptop;
