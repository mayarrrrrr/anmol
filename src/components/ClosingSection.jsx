import React, { useCallback, useState } from "react";
import { Heart, Sparkles, PenLine, LogOut } from "lucide-react";
import { CONFIG } from "../config.js";
import BurstParticles from "./BurstParticles.jsx";

export default function ClosingSection({ auth }) {
  const [bursting, setBursting] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const handleBurst = useCallback(() => {
    setBursting(true);
    setBurstKey((k) => k + 1);
    setTimeout(() => setBursting(false), 1400);
  }, []);

  const { checking, isAdmin, wrongAccount, signIn, signOut } = auth;

  // The pencil in the footer note doubles as the admin entry point —
  // click it to sign in with Google. Signed in as the right account,
  // it turns into a small "editing as admin" pill you can tap to sign out.
  const handleFooterClick = useCallback(() => {
    if (checking) return;
    if (isAdmin) {
      signOut();
    } else {
      signIn();
    }
  }, [checking, isAdmin, signIn, signOut]);

  return (
    <section className="closing-section section">
      <h2>Here's to forever, {CONFIG.partnerName}.</h2>

      <button className="burst-btn" onClick={handleBurst}>
        <Heart size={18} fill="currentColor" strokeWidth={0} className="burst-heart" />
        send a little love
        <Sparkles size={16} />
      </button>

      <button
        type="button"
        className={`footer-note footer-note-btn ${isAdmin ? "is-admin" : ""}`}
        onClick={handleFooterClick}
        title={isAdmin ? "Signed in as admin — click to sign out" : "Admin sign in"}
      >
        {isAdmin ? (
          <>
            <LogOut size={12} style={{ display: "inline", verticalAlign: "-1px" }} /> editing as admin
          </>
        ) : (
          <>
            made with <PenLine size={12} style={{ display: "inline", verticalAlign: "-1px" }} /> for {CONFIG.partnerName}
          </>
        )}
      </button>
      <p className="admin-wrong-account">Developed by <a className="admin-wrong-account" href="https://www.linkedin.com/in/mayarakok">Mayar Akok</a>.</p>
      {wrongAccount && (
        <p className="admin-wrong-account">that Google account isn't set up to edit this site.</p>
      )}

      {bursting && <BurstParticles burstKey={burstKey} />}
    </section>
  );
}
