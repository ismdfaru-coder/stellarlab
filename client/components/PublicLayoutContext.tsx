import React, { createContext, useContext, useState } from "react";

interface PublicLayoutContextType {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const PublicLayoutContext = createContext<PublicLayoutContextType | null>(null);

export function PublicLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <PublicLayoutContext.Provider
      value={{ isSidebarOpen, setSidebarOpen, toggleSidebar }}
    >
      {children}
    </PublicLayoutContext.Provider>
  );
}

export function usePublicLayout() {
  const context = useContext(PublicLayoutContext);
  if (!context) {
    throw new Error(
      "usePublicLayout must be used within a PublicLayoutProvider",
    );
  }
  return context;
}
