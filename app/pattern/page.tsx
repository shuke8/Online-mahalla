"use client";

import { useEffect } from "react";

export default function PatternPage() {
  useEffect(() => {
    const nav = document.querySelector("nav");
    const main = document.querySelector("main");
    if (nav) nav.style.display = "none";
    if (main) {
      main.style.padding = "0";
      main.style.margin = "0";
    }
    return () => {
      if (nav) nav.style.display = "";
      if (main) {
        main.style.padding = "";
        main.style.margin = "";
      }
    };
  }, []);

  return <div className="min-h-screen" />;
}
