import React, { ReactNode } from "react";
import GoogleTranslate from "../accessibility/GoogleTranslate";
import TextToSpeech from "../accessibility/TextToSpeech";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="app-container">
      {/* Accessibility toolbar fixed to the page */}
      <div className="fixed top-0 right-0 z-50 flex items-center gap-2 p-2 bg-white/90 rounded-bl-lg shadow-md">
        <GoogleTranslate />
        <TextToSpeech />
      </div>
      
      {/* Main content */}
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;