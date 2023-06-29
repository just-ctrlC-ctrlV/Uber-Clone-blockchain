import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import metaMask from "../../assets/metamask.svg";
import ether from "../../assets/ether.svg";
import getUserRides from "../api/GetUserRides";
import { useRouter } from "next/router";
import { Navbar } from "@/components";

function ShowRides() {
  const router = useRouter();
  const [rides, setRides] = useState([]);
  const [address] = useState(router.query.address);

  useEffect(() => {
    console.log(address);
    async function fetch() {
      const response = await getUserRides({
        address,
      });
      setRides(response);
    }
    fetch();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <Navbar />
      {rides?.map((ride, index) => (
        <div
          key={index}
          className="w-full px-4 py-2 bg-white shadow-lg rounded-2xl dark:bg-gray-800 flex flex-col gap-4">
          <p className="flex font-semibold text-black text-sm dark:text-white gap-3">
            <Image
              alt="profil"
              src={metaMask}
              className=" object-cover  h-6 w-6 "
            />
            {address}
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
              Ride Fair : {ride.amount.toFixed(2)}{" "}
              <Image src={ether} alt="ETH" className="w-6 pl-2" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowRides;
