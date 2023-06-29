import addUserRide from "./AddUserRide";

export const chargeUser = async (req) => {
  const { amount, currentUserAddress, metamask, start, end, rideType } = req;

  try {
    await metamask.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: currentUserAddress,
          to: process.env.NEXT_PUBLIC_UBER_ADDRESS,
          gas: "0x7EF40", // 52000 Gas limit
          value: Number(amount * 1000000000000000000).toString(16), //  wei
        },
      ],
    });
    await addUserRide({
      address: currentUserAddress,
      ride: { start, end, rideType, amount, date: Date.now() },
    });
    window.location.reload();
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error.message);
  }
};
