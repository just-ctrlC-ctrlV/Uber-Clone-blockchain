import React from "react";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import metaMask from "../assets/metamask.svg";
import ether from "../assets/ether.svg";
import getUserRides from "./api/GetUserRides";
import { Navbar } from "@/components";
import { UberContext } from "@/context/UberContext";

function ShowRides() {
  const [rides, setRides] = useState([]);
  const useUber = useContext(UberContext);

  useEffect(() => {
    console.log(useUber.currentUser);
    async function fetch() {
      const response = await getUserRides({
        address: useUber.currentUser,
      });
      console.log(response);
      setRides(response);
    }
    fetch();
  }, [useUber?.currentUser]);

  return (
    <div className="w-full flex flex-col gap-4">
      <Navbar />
      {rides?.length === 0 ? (
        <div>choose Ur ride</div>
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