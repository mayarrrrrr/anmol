import React, { useCallback, useRef, useState } from "react";
import FloatingHearts from "./components/FloatingHearts.jsx";
import Hero from "./components/Hero.jsx";
import LetterSection from "./components/LetterSection.jsx";
import GallerySection from "./components/GallerySection.jsx";
import ClosingSection from "./components/ClosingSection.jsx";
import { useAdminAuth } from "./hooks/useAdminAuth.js";

export default function App() {
  const [opened, setOpened] = useState(false);
  const letterRef = useRef(null);
  const auth = useAdminAuth();

  // Hero seal: just scroll down to the letter, don't open it yet
  const handleScrollToLetter = useCallback(() => {
    letterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Letter card tap: actually reveal the letter
  const handleOpenLetter = useCallback(() => {
    setOpened(true);
  }, []);

  return (
    <div className="anniv-root">
      <div className="bg-orb one" aria-hidden="true" />
      <div className="bg-orb two" aria-hidden="true" />
      <FloatingHearts count={16} />

      <Hero opened={opened} onOpen={handleScrollToLetter} />
      <LetterSection ref={letterRef} opened={opened} onOpen={handleOpenLetter} isAdmin={auth.isAdmin} />
      <GallerySection />
      <ClosingSection auth={auth} />
    </div>
  );
}