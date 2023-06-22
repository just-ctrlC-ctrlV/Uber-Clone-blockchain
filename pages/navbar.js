import React from "react";
import { useState } from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import login from "../assets/login.png";
import profile from "../assets/profile.jpg";

const navStyle = {
  wrapper: "w-full bg-gray-800 h-16 flex justify-between  items-center px-4",
  logo: "text-white text-2xl font-bold w-28 cursor-pointer",
  home: "text-white text-2xl font-bold cursor-pointer",
  rides: "text-white text-2xl font-bold cursor-pointer",
  login: "text-white text-2xl font-bold w-12  cursor-pointer",
  profile:
    "text-white text-2xl font-bold w-14 h-14 rounded-full overflow-hidden border-2 border-white cursor-pointer",
};

function Navbar() {
  const [isLogedIn, setislogedIn] = useState(true);

  return (
    <div className={navStyle.wrapper}>
      <div className={navStyle.logo}>
        <Image src={logo} alt="Logo" />
      </div>
      <div className={navStyle.home}>Home</div>
      {isLogedIn ? (
        <>
          <div className={navStyle.rides}>Rides</div>
          <div className={navStyle.profile}>
            <Image src={profile} alt="profile pic" />
          </div>
        </>
      ) : (
        <div className={navStyle.login}>
          <Image src={login} alt="Login" />
        </div>
      )}
    </div>
  );
}

export default Navbar;
