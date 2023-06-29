import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { UberContext } from "../context/UberContext";
import Image from "next/image";
import uber_go from "../assets/uber_go.png";
import uber_moto from "../assets/uber_moto.webp";
import uber_premier from "../assets/uber_premier.webp";
import uber_auto from "../assets/uber_auto.webp";
import eth from "../assets/ether.svg";

const rides = [
  {
    name: "Uber Go",
    image: uber_go,
    pricefac: 0.51,
    time: "5 min",
  },
  {
    name: "Uber Moto",
    image: uber_moto,
    pricefac: 0.32,
    time: "2 min",
  },
  {
    name: "Uber Premier",
    image: uber_premier,
    pricefac: 0.65,
    time: "5 min",
  },
  {
    name: "Uber Auto",
    image: uber_auto,
    pricefac: 0.42,
    time: "2 min",
  },
];
const style = {
  wrapper:
    "w-full h-full  flex flex-col gap-2  bg-white rounded-md  items-center py-4",
};

const formula = (pricefac, tripDuration) => {
  return (pricefac * tripDuration) / 1000000;
};

const Rides = () => {
  const [rideon, setrideon] = useState(-1);

  const useUber = useContext(UberContext);

  useEffect(() => {
    if (rideon !== -1) {
      useUber?.setTripCost(
        formula(rides[rideon].pricefac, useUber?.tripDuration)
      );
      useUber?.setSelectedRide(rides[rideon]);
    }
  }, [rideon]);
  return (
    <div className={style.wrapper}>
      <h4 className="text-xs text-black sm:flex hidden">Choose your ride </h4>
      {rides.map((ride, index) => (
        <div
          className={
            "w-full h-1/4 px-4 flex items-center justify-between gap-2 cursor-pointer " +
            (rideon === index
              ? "border-2 border-black rounded bg-slate-300"
              : "")
          }
          key={index}
          onClick={() => setrideon(index)}>
          <div className="flex  items-center">
            <Image
              src={ride.image}
              alt={ride.name}
              className="w-16 h-12 p-1 mr-4"
            />
            <div className="flex flex-col items-start">
              <h1 className="text-sm font-semibold text-black ">{ride.name}</h1>
              <h2 className="text-xs text-gray-500 ">{ride.time} away</h2>
            </div>
          </div>
          <div className=" flex flex-col items-center">
            <h2 className="text-m text-black font-semibold flex items-center">
              {formula(ride.pricefac, useUber?.tripDuration).toFixed(4)}
              <Image src={eth} className="w-8" alt="eth" />
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rides;
