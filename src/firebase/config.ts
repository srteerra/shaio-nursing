import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { environment } from "@/environment/environment";
import { getAuth } from "firebase/auth";

const app = initializeApp(environment.firebase);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, app, auth };
