import { db } from "../../utils/firebaseConfig";
import { collection, getDocs, getDoc, where, query } from "firebase/firestore";

export default async function getUserRides({ address }) {
  try {
    const user = collection(db, "Users");
    const q = query(user, where("address", "==", address));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0];
      const docSnap = await getDoc(docRef.ref);
      // console.log(docSnap.data().rides);
      return docSnap.data().rides;
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error.message);
  }
}
