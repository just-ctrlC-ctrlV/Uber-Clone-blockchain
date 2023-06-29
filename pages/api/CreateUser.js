import { db } from "../../utils/firebaseConfig";
import { collection, getDocs, addDoc, where, query } from "firebase/firestore";

export default async function createUser({ address }) {
  try {
    const user = collection(db, "Users");
    const q = query(user, where("address", "==", address));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      const docRef = await addDoc(user, {
        address: address,
        rides: [],
      });
      console.log("Document written with ID: ", docRef.id);
    } else {
      console.log("User already exists");
    }
  } catch (error) {
    console.log(error.message);
  }
}
