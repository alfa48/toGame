// auth.ts
import { auth, googleProvider, signInWithPopup } from "./firebase-config";
import { db, doc, getDoc, setDoc } from "./firebase-config";
import type { UserProfile } from "../types";
import {
  generateUsername,
  generateAvatar,
  isGoogleDefaultAvatar,
} from "../utils/avatar";

export const signInWithGoogle = async (): Promise<UserProfile> => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  const userRef = doc(db, "users", user.uid);
  const existing = await getDoc(userRef);

  let userData: UserProfile;

  console.log("User signed in:", user.uid);
  console.log("Checking if user.url exists in Firestore:", user.photoURL);
  if (!existing.exists()) {
    const username = generateUsername(user.displayName);
    const avatar = generateAvatar(user.photoURL);

    // Criar usuário novo no Firestore
    userData = {
      uid: user.uid,
      displayName: username || "NoName",
      email: user.email || "player@togame.com",
      photoURL: avatar || user.photoURL,
      score: 0,
    };

    console.log("Saving user data to Firestore:", userData);
    await setDoc(userRef, userData); // <-- AQUI SALVA NO FIRESTORE
  } else {
    // Usuário já existe no Firestore → carregar dados
    userData = existing.data() as UserProfile;
  }

  return userData;
};

export const signOutUser = async () => {
  await auth.signOut();
};
