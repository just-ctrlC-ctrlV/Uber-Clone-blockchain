import React from "react";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { UberContext } from "@/context/UberContext";
import uber from "../assets/uber.svg";
import login from "../assets/login.png";
import ethlogo from "../assets/ether.svg";
import metamask from "../assets/metamask.svg";
import Link from "next/link";

const navStyle = {
  wrapper: "w-full bg-black h-20 flex justify-between  items-center px-4",
  logo: "text-white text-2xl font-bold w-28 cursor-pointer",
  home: "text-white text-2xl font-bold cursor-pointer",
  rides: "text-white text-xl font-semibold  cursor-pointer",
  login: "text-white text-2xl font-bold w-12  cursor-pointer",
  address:
    "sm:flex hidden text-slate-300 text-xs font-medium text-green-200  cursor-pointer",
  profile:
    "text-white text-2xl font-bold sm:w-8 sm:h-8 w-10 h-10  overflow-hidden  cursor-pointer",
};

function Navbar() {
  const [isLogedIn, setislogedIn] = useState(false);
  const useUber = useContext(UberContext);

  useEffect(() => {
    if (useUber?.currentUser) {
      setislogedIn(true);
    } else {
      setislogedIn(false);
    }
  }, [useUber?.currentUser]);
  const address =
    useUber?.currentUser?.toString().slice(0, 6) +
    "..." +
    useUber?.currentUser?.toString().slice(-4);
  return (
    <div className={navStyle.wrapper}>
      <Link href={`/`}>
        <div className={navStyle.logo}>
          <Image src={uber} alt="Logo" />
        </div>
      </Link>
      {isLogedIn ? (
        <div className="flex justify-between gap-8 items-center px-6">
          <Link href={`/showrides`}>
            <div className={navStyle.rides}>Your rides</div>
          </Link>
          <div className="flex items-center bg-[#161618] h-14 px-4 py-2 rounded-lg gap-2 shadow-slate-800 shadow-md cursor-pointer">
            <Image src={ethlogo} alt="ethlogo" className=" w-7 h-7" />
            <div className="">
              <div className={navStyle.address}>{address}</div>
            </div>
            <div className={navStyle.profile}>
              <Image src={metamask} alt="profile pic" />
            </div>
          </div>
        </div>
      ) : (
        <div className={navStyle.login}>
          <Image src={login} alt="Login" onClick={useUber?.connectWallet} />
        </div>
      )}
    </div>
  );
}

export default Navbar;
