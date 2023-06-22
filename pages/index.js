import Navbar from "./navbar.js";
import Map from "./map.js";
import LocationSelector from "./locationSelector.js";

const style = {
  wrapper: "w-screen h-screen flex flex-col",
  map: "w-full  h-screen overflow-hidden",
};

export default function Home() {
  return (
    <div className={style.wrapper}>
      <Navbar />
      <div className={style.map}>
        <Map />
      </div>
      <LocationSelector />
    </div>
  );
}
