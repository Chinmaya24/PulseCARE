import React, { createContext, useState, useContext, ReactNode } from "react";

interface AccessibilityContextType {
  showAccessibilityTools: boolean;
  setShowAccessibilityTools: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create context with a default value
const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [showAccessibilityTools, setShowAccessibilityTools] = useState<boolean>(true);
  
  return (
    <AccessibilityContext.Provider value={{ showAccessibilityTools, setShowAccessibilityTools }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Custom hook to use the accessibility context
export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  
  return context;
};