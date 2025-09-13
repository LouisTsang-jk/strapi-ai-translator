import React from 'react';
import { TranslatePanel } from './TranslatePanel';

// Define types based on Strapi v5 API
interface PanelComponentProps {
  activeTab?: string;
  document?: Record<string, any>;
  documentId?: string;
  model?: any;
  collectionType?: any;
  meta?: any;
}

// Create the panel component as a React functional component
export const TranslatePanelContainer: React.FC<PanelComponentProps> = (props) => {
  // Extract locale from document data or default to 'en'
  const currentLocale = (props.document as any)?.locale || 'en';
  const contentData = props.document || {};

  return (
    <TranslatePanel
      currentLocale={currentLocale}
      contentData={contentData}
    />
  );
};

// Add display properties for Strapi
TranslatePanelContainer.displayName = 'AI Translation';

// Export as default for compatibility
export default TranslatePanelContainer;