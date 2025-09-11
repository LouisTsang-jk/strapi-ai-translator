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

type PanelComponent = (props: PanelComponentProps) => {
  title: string;
  content: React.ReactNode;
};

// Create the panel component following Strapi v5 PanelComponent interface
export const TranslatePanelContainer: PanelComponent = ({
  document
}: PanelComponentProps) => {
  // Extract locale from document data or default to 'en'
  const currentLocale = (document as any)?.locale || 'en';
  const contentData = document || {};

  return {
    title: 'AI Translation',
    content: (
      <TranslatePanel
        currentLocale={currentLocale}
        contentData={contentData}
      />
    )
  };
};