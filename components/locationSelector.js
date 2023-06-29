import { useContext } from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { UberContext } from "../context/UberContext";
import Rides from "./rides";
import { chargeUser } from "../pages/api/payment.js";
import ride from "../assets/ride.svg";

const style = {
  wrapper:
    "sm:w-80 sm:h-104 w-full min-h-[400px] flex flex-col gap-2 top-32 sm:left-10  bg-white sm:rounded-md sm:absolute items-center sm:px-0 px-4 py-4",
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
        className="sm:w-72 h-8 w-full  border-2 bg-slate-300 border-gray-300 text-black rounded-md px-4"
        type="text"
        placeholder="Enter pickup loction "
        onFocus={() => {
          setfocusOn("where");
        }}
        onBlur={() => onfousShift()}
        onChange={(e) => setPickUpPoint(e.target.value)}
      />
      <input
        className="sm:w-72 h-8 w-full  border-2 bg-slate-300 border-gray-300  text-black rounded-md px-4"
        type="text"
        placeholder="Where to ?"
        onFocus={() => {
          setfocusOn("there");
        }}
        onBlur={() => onfousShift()}
        onChange={(e) => setDropPoint(e.target.value)}
      />
      {pickUpPoint && dropPoint ? (
        <div className=" w-full h-3/5 flex flex-col items-center border-y-2 border-gray-200 ">
          <Rides />
        </div>
      ) : (
        <div className=" w-full h-3/5 flex text-slate-600 flex-col items-center border-y-2 border-gray-200 ">
          <Image src={ride} alt="" className="w-40" />
          Set your location for ride options
        </div>
      )}

      <button
        className={
          "w-4/5 bg-black hover: text-white font-bold py-2 px-4 rounded-md " +
          (pickUpPoint.length === 0 ||
          dropPoint.length === 0 ||
          !useUber?.selectedRide?.name ||
          !isLogedIn
            ? "bg-gray-400 cursor-not-allowed"
            : "")
        }
        onClick={() => {
          chargeUser({
            currentUserAddress: useUber?.currentUser,
            metamask: useUber?.metamask,
            start: pickUpPoint,
            end: dropPoint,
            rideType: useUber?.selectedRide?.name,
            amount: useUber?.tripCost,
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
