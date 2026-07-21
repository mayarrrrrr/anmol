import { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider, ADMIN_EMAIL } from "../firebase.js";

/**
 * Tracks Google sign-in state and whether the signed-in account matches
 * ADMIN_EMAIL (set in src/firebase.js). Only that one account is treated
 * as the admin — everyone else is a regular visitor, even if signed in.
 */
export function useAdminAuth() {
  const [user, setUser] = useState(undefined); // undefined = checking, null = signed out

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const signIn = useCallback(() => {
    signInWithPopup(auth, googleProvider).catch((err) => {
      console.error("Sign-in failed:", err);
    });
  }, []);

  const signOutAdmin = useCallback(() => {
    signOut(auth).catch((err) => console.error("Sign-out failed:", err));
  }, []);

  return {
    checking: user === undefined,
    user: user ?? null,
    isAdmin: !!user && user.email === ADMIN_EMAIL,
    wrongAccount: !!user && user.email !== ADMIN_EMAIL,
    signIn,
    signOut: signOutAdmin,
  };
}
