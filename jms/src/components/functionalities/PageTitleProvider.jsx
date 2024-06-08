import React, { createContext, useContext, useState } from 'react';

const PageTitleContext = createContext({
  pageTitle: 'Default Title',
  handlePageTitleChange: () => {},
});

export const PageTitleProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState('Default Title');

  const handlePageTitleChange = (newTitle) => {
    setPageTitle(newTitle);
  };

  return (
    <PageTitleContext.Provider value={{ pageTitle, handlePageTitleChange }}>
      {children}
    </PageTitleContext.Provider>
  );
};

export const usePageTitle = () => {
  const context = useContext(PageTitleContext);
  if (!context) {
    throw new Error('usePageTitle must be used within a PageTitleProvider');
  }
  return context;
};
