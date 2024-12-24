import Recently from "../components/recently";
import Button from "../UIKit/Button";

export default function Home() {
  function create() {
    window.location.href = "/create";
  }
  function open() {
    window.location.href = "/open";
  }

  return (
    <div className="h-screen flex items-center justify-between">
      <div className="flex flex-col items-center mx-auto">
        <h2 className="text-white font-bold text-2xl mb-4 w-full text-left">
          Recently Projects
        </h2>
        <div className="bg-white w-96 h-96 rounded-xl shadow-lg">
          <Recently />
        </div>
      </div>

      <div className="flex flex-col items-end justify-center pr-10">
        <Button text="Create" func={create} />
        <Button text="Open" func={open} />
      </div>
    </div>
  );
}
