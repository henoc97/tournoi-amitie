import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { app } from "./firebase";
import { User } from "@/entities/User";

const auth = getAuth(app);

export const login = async (email: string, password: string): Promise<User> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser: FirebaseUser = userCredential.user;
    return {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
    };
};

export const logout = async (): Promise<void> => {
    await signOut(auth);
};

export const listenAuthState = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
            callback({ uid: firebaseUser.uid, email: firebaseUser.email });
        } else {
            callback(null);
        }
    });
};
