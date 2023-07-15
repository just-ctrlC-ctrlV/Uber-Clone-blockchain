import { Navbar } from "@/components";
import { Map } from "@/components";
import { LocationSelector } from "@/components";

const style = {
  wrapper: "w-screen h-screen flex flex-col relative ",
  main: "w-full h-full flex flex-col items-center justify-center overflow-hidden",
};

export default function Home() {
  return (
    <div className={style.wrapper}>
      <Navbar />
      <div className={style.main}>
        <Map />
      </div>
      <LocationSelector />
    </div>
  );
}
