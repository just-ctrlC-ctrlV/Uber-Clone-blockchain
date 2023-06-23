import { createContext } from "react";
import { useState, useEffect } from "react";
import { triptime } from "../pages/api/getDuration";

export const UberContext = createContext();

export function UberProvider({ children }) {
  const [picklatlng, setpicklatlng] = useState([]);
  const [droplatlng, setdroplatlng] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRide, setSelectedRide] = useState({});
  const [tripDuration, setTripDuration] = useState(0);
  const [tripCost, setTripCost] = useState(0);

  let metamask;
  if (typeof window !== "undefined") {
    metamask = window.ethereum;
  }

  useEffect(() => {
    if (metamask) {
      checkIfWalletConnected();
    }
  }, []);
  useEffect(() => {
    if (picklatlng[0] && droplatlng[0]) {
      const tripDuration = async (picklatlng, droplatlng) => {
        try {
          if (picklatlng[0] && droplatlng[0]) {
            const duration = await triptime(picklatlng, droplatlng);
            setTripDuration(duration);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      tripDuration(picklatlng, droplatlng);
    }
  }, [picklatlng, droplatlng]);

  const checkIfWalletConnected = async () => {
    const accounts = await metamask.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      setCurrentUser(accounts[0]);
    } else {
      return false;
    }
  };

  const connectWallet = async () => {
    if (metamask) {
      try {
        const accounts = await metamask.request({
          method: "eth_requestAccounts",
        });
        setCurrentUser(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const Geocoder = async (type, location) => {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_MAPBOX_GEOCODER_URL}${location}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
      )
        .then((res) => res.json())
        .then((res) => {
          if (type === "pick") {
            // console.log(res.features[0].center);
            setpicklatlng(res.features[0].center);
          }
          if (type === "drop") {
            // console.log(res.features[0].center);
            setdroplatlng(res.features[0].center);
          }
        });
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const value = {
    metamask,
    Geocoder,
    currentUser,
    connectWallet,
    picklatlng,
    droplatlng,
    tripDuration,
    selectedRide,
    setSelectedRide,
    tripCost,
    setTripCost,
  };

  return <UberContext.Provider value={value}>{children}</UberContext.Provider>;
}
