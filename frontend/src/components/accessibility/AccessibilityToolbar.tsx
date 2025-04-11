import React from "react";
import GoogleTranslate from "./GoogleTranslate";
import TextToSpeech from "./TextToSpeech";
import { useAccessibility } from "@/contexts/AccessibilityContext";

const AccessibilityToolbar: React.FC = () => {
  const { showAccessibilityTools } = useAccessibility();
  
  if (!showAccessibilityTools) return null;
  
  return (
    <div className="fixed top-0 right-0 z-50 flex items-center gap-2 p-2 bg-white/90 rounded-bl-lg shadow-md">
      <GoogleTranslate />
      <TextToSpeech />
    </div>
  );
};

export default AccessibilityToolbar;