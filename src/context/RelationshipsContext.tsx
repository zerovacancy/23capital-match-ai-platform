import React, { createContext, useContext, ReactNode, useState } from 'react';

// Simple context to manage relationship data
interface RelationshipsContextType {
  isLoading: boolean;
  refresh: () => void;
}

const RelationshipsContext = createContext<RelationshipsContextType | undefined>(undefined);

export const RelationshipsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const refresh = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <RelationshipsContext.Provider value={{
      isLoading,
      refresh
    }}>
      {children}
    </RelationshipsContext.Provider>
  );
};

export const useRelationships = () => {
  const context = useContext(RelationshipsContext);
  if (context === undefined) {
    throw new Error('useRelationships must be used within a RelationshipsProvider');
  }
  return context;
};