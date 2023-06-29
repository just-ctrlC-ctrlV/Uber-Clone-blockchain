import { db } from "../../utils/firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  where,
  query,
} from "firebase/firestore";

export default async function addUserRide({ address, ride }, res) {
  try {
    const user = collection(db, "Users");
    const q = query(user, where("address", "==", address));
    const querySnapshot = await getDocs(q);
    if (querySnapshot) {
      const docRef = querySnapshot.docs[0];
      const docSnap = await getDoc(docRef.ref);
      const rides = docSnap.data().rides;
      rides.push(ride);
      await updateDoc(docRef.ref, {
        rides: rides,
      });
    } else {
      console.log("empty");
    }
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error.message);
  }
}
