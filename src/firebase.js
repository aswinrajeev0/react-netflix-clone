import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const key = import.meta.env.VITE_FIREBASE_KEY;

const firebaseConfig = {
  apiKey: key,
  authDomain: "netflix-clone-57615.firebaseapp.com",
  projectId: "netflix-clone-57615",
  storageBucket: "netflix-clone-57615.firebasestorage.app",
  messagingSenderId: "703310783520",
  appId: "1:703310783520:web:6e3ba96b55f6c4e85e4845"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signUp = async (name, email,password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        const user = response.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = async () => {
    try {
        signOut(auth)
    } catch (error) {
        console.error(error)
    }
}

export {auth, db, login, signUp, logout}