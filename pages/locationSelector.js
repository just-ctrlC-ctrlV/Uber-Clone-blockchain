import { useContext } from "react";
import { useState, useEffect } from "react";
import { UberContext } from "../context/UberContext";
import Rides from "./rides";
import { chargeUser } from "./api/payment.js";

const style = {
  wrapper:
    "w-80 h-104 flex flex-col gap-2 top-32 left-10  bg-white rounded-md absolute items-center py-4",
};

function LocationSelector() {
  const [isLogedIn, setislogedIn] = useState(false);
  const [focusOn, setfocusOn] = useState("where");
  const [pickUpPoint, setPickUpPoint] = useState("");
  const [dropPoint, setDropPoint] = useState("");

  const useUber = useContext(UberContext);

  useEffect(() => {
    if (useUber?.currentUser) {
      setislogedIn(true);
    } else {
      setislogedIn(false);
    }
  }, [useUber?.currentUser]);

  const onfousShift = () => {
    if (pickUpPoint.length !== 0) useUber?.Geocoder("pick", pickUpPoint);
    if (dropPoint.length !== 0) useUber?.Geocoder("drop", dropPoint);
    console.log(useUber?.picklatlng, useUber?.droplatlng);
  };

  return (
    <div className={style.wrapper}>
      <h1 className="text-black font-medium">
        {focusOn == "where"
          ? " Where can we pick you up ?"
          : "  Where you wana go ?"}
      </h1>
      <input
        className="w-72 h-8 border-2 bg-slate-300 border-gray-300 text-black rounded-md px-4"
        type="text"
        placeholder="Enter pickup loction "
        onFocus={() => {
          setfocusOn("where");
        }}
        onBlur={() => onfousShift()}
        onChange={(e) => setPickUpPoint(e.target.value)}
      />
      <input
        className="w-72 h-8 border-2 bg-slate-300 border-gray-300  text-black rounded-md px-4"
        type="text"
        placeholder="Where to ?"
        onFocus={() => {
          setfocusOn("there");
        }}
        onBlur={() => onfousShift()}
        onChange={(e) => setDropPoint(e.target.value)}
      />
      <div className=" w-full h-3/5 flex flex-col items-center border-y-2 border-gray-200 ">
        <Rides />
      </div>

      <button
        className="w-4/5 bg-black hover: text-white font-bold py-2 px-4 rounded-md "
        onClick={() => {
          chargeUser({
            amount: useUber?.tripCost,
            currentUserAddress: useUber?.currentUser,
            metamask: useUber?.metamask,
          });
        }}
        disabled={
          pickUpPoint.length === 0 ||
          dropPoint.length === 0 ||
          !isLogedIn ||
          !useUber?.selectedRide?.name
        }>
        Confirm
      </button>
    </div>
  );
}

export default LocationSelector;
