import { UberProvider } from "@/context/UberContext.js";
import Navbar from "./navbar.js";
import Map from "./map.js";
import LocationSelector from "./locationSelector.js";

const style = {
  wrapper: "w-screen h-screen flex flex-col relative ",
  main: "w-full h-full flex flex-col items-center justify-center overflow-hidden",
};

export default function Home() {
  return (
    <UberProvider>
      <div className={style.wrapper}>
        <Navbar />
        <div className={style.main}>
          <Map />
        </div>
        <LocationSelector />
      </div>
    </UberProvider>
  );
}
