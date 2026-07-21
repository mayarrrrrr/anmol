import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { Pencil, Check, Heart, Sparkles, Plane } from "lucide-react";
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.js";
import { CONFIG } from "../config.js";
import { useReveal } from "../hooks/useReveal.js";
import { useTilt } from "../hooks/useTilt.js";

const PLACEHOLDER = `My  ${CONFIG.partnerName},

Write something

Forever yours,
${CONFIG.yourName}`;

const LetterSection = forwardRef(function LetterSection({ opened, onOpen, isAdmin }, ref) {
  const [headRef, headVisible] = useReveal();
const [cardRevealRef, cardVisible] = useReveal();
const tilt = useTilt({ max: 5, scale: 1.015, perspective: 1400 });

// merge the two refs onto the same DOM node
const setCardRef = useCallback((node) => {
  cardRevealRef.current = node;
  tilt.ref.current = node;
}, [cardRevealRef, tilt.ref]);

  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Live-subscribe to the message doc — updates instantly for every visitor
  // whenever the admin saves a change, no refresh needed.
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "site", "message"),
      (snap) => {
        setLetter(snap.exists() ? snap.data().text || "" : "");
        setLoading(false);
      },
      (err) => {
        console.error("Failed to load letter:", err);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  const startEdit = useCallback(() => {
    setDraft(letter || PLACEHOLDER);
    setEditing(true);
  }, [letter]);

  const save = useCallback(async () => {
    const next = draft.trim();
    setSaving(true);
    try {
      await setDoc(doc(db, "site", "message"), {
        text: next,
        updatedAt: serverTimestamp(),
      });
      setEditing(false);
    } catch (err) {
      console.error("Failed to save letter:", err);
    } finally {
      setSaving(false);
    }
  }, [draft]);

  const displayText = loading ? "" : letter || (isAdmin ? PLACEHOLDER : "");
  const paragraphs = displayText
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const handleCardClick = useCallback(() => {
  console.log("card clicked", { opened, editing, hasOnOpen: !!onOpen });
  if (!opened && !editing) {
    onOpen?.();
  }
}, [opened, editing, onOpen]);

  return (
    <section className="letter-section section" ref={ref}>
      <div ref={headRef} className={`letter-head ${headVisible ? "visible" : ""}`}>
        <h2>A little something I wrote</h2>
        <p>open when you have a quiet minute</p>
      </div>

      <div
  ref={setCardRef}
  onMouseMove={editing ? undefined : tilt.onMouseMove}
  onMouseLeave={editing ? undefined : tilt.onMouseLeave}
  onClick={handleCardClick}
  className={`letter-card ${cardVisible ? "revealed" : ""} ${opened ? "opened" : ""} ${editing ? "editing" : ""}`}
>
        {isAdmin && opened && (
          <button
            type="button"
            className="letter-edit-btn"
            onClick={(e) => {
              e.stopPropagation();
              editing ? save() : startEdit();
            }}
            disabled={saving}
            aria-label={editing ? "Save letter" : "Edit letter"}
          >
            {editing ? <Check size={15} /> : <Pencil size={15} />}
            <span>{saving ? "saving…" : editing ? "save" : "edit"}</span>
          </button>
        )}

        { !opened ? (
          <div className="letter-closed-face">
  <div className="letter-seal-orbit">
    <span className="compass-ring ring-outer" />
    <span className="compass-ring ring-inner" />
    <span className="compass-tick tick-n">N</span>
    <span className="compass-tick tick-e">E</span>
    <span className="compass-tick tick-s">S</span>
    <span className="compass-tick tick-w">W</span>

    <span className="orbit-plane"><Plane size={14} /></span>
    <span className="orbit-dot orbit-dot-a"><Sparkles size={12} /></span>
    <span className="orbit-dot orbit-dot-b"><Heart size={10} fill="currentColor" strokeWidth={0} /></span>
    <span className="orbit-dot orbit-dot-c"><Sparkles size={9} /></span>
    <span className="orbit-dot orbit-dot-d"><Heart size={8} fill="currentColor" strokeWidth={0} /></span>

    <span className="letter-seal-icon">
      <Heart size={26} fill="currentColor" strokeWidth={0} />
    </span>
  </div>
  <h3>A letter for you</h3>
  <p>sealed with a little too much love</p>
  <span className="letter-closed-hint">flight path set — tap to open</span>
</div>
        ) : editing ? (
          <textarea
            className="letter-textarea"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="Write your message here. Leave a blank line between paragraphs."
            autoFocus
          />
        ) : loading ? (
          <p className="body-line show">loading…</p>
        ) : paragraphs.length > 0 ? (
          paragraphs.map((line, i) => (
            <p
              key={i}
              className={`body-line ${opened ? "show" : ""}`}
              style={{ transitionDelay: `${0.3 + i * 0.2}s` }}
            >
              {line}
            </p>
          ))
        ) : (
          <p className={`body-line ${opened ? "show" : ""}`}>
            the note hasn't been written yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
});

export default LetterSection;