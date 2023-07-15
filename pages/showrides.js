import React from "react";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import metaMask from "../assets/metamask.svg";
import ether from "../assets/ether.svg";
import getUserRides from "./api/GetUserRides";
import { Navbar } from "@/components";
import { UberContext } from "@/context/UberContext";
import Illustration from "@/components/animation";

function ShowRides() {
  const [rides, setRides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const useUber = useContext(UberContext);

  useEffect(() => {
    console.log(useUber.currentUser);
    async function fetch() {
      setIsLoading(true);
      const response = await getUserRides({
        address: useUber.currentUser,
      });
      setRides(response);

      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
    fetch();
  }, [useUber?.currentUser]);

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <Navbar />
      {isLoading ? (
        <div className="w-96">
          <Illustration />
        </div>
      ) : rides?.length == 0 ? (
        <div className="mt-32 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
          {"Looks like you haven't taken a trip yet."}
        </div>
      ) : (
        rides?.map((ride, index) => (
          <div
            key={index}
            className="w-full px-4 py-2 bg-white shadow-lg rounded-2xl dark:bg-gray-800 flex flex-col gap-4">
            <p className="flex font-semibold text-black text-sm dark:text-white gap-3">
              <Image
                alt="profil"
                src={metaMask}
                className=" object-cover  h-6 w-6 "
              />
              {useUber?.currentUser}
            </p>
            <div className="flex flex-wrap justify-around">
              <span className="w-1/4 flex justify-center text-sm font-semibold text-gray-400 dark:text-gray-300">
                Ride Choice: {ride.rideType}
              </span>
              <span className="w-1/4 flex justify-center  text-sm text-gray-600 dark:text-gray-300">
                Pickup Point : {ride.start}
              </span>
              <span className="w-1/4 flex justify-center text-sm text-gray-600 dark:text-gray-300">
                Drop Point : {ride.end}
              </span>
              <span className="w-1/4 flex justify-center text-sm text-gray-600 dark:text-gray-300">
                Ride Fair : {ride.amount.toFixed(3)}{" "}
                <Image src={ether} alt="ETH" className="w-6 pl-2" />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ShowRides;
