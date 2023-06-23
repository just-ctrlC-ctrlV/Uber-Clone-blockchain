import { UberProvider } from "@/context/UberContext.js";
import Navbar from "./navbar.js";
import Map from "./map.js";
import LocationSelector from "./locationSelector.js";

const style = {
  wrapper: "w-screen h-screen flex flex-col ",
  main: "w-screen  h-full flex-1 z-10 ",
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
