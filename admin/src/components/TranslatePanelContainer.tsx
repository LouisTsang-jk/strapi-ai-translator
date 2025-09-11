import React from 'react';
import { TranslatePanel } from './TranslatePanel';

declare global {
  interface Window {
    strapi: {
      unstable_useContentManagerContext?: () => {
        form: {
          values: Record<string, any>;
        };
        layout: {
          contentType: {
            pluginOptions?: {
              i18n?: {
                localized: boolean;
              };
            };
          };
        };
      };
      useRBACProvider?: () => {
        allPermissions: any[];
      };
    };
  }
}

export const TranslatePanelContainer: React.FC = () => {
  const [contentData, setContentData] = React.useState<Record<string, any>>({});
  const [currentLocale, setCurrentLocale] = React.useState<string>('en');

  React.useEffect(() => {
    try {
      if (window.strapi?.unstable_useContentManagerContext) {
        const context = window.strapi.unstable_useContentManagerContext();
        const formData = context?.form?.values || {};
        setContentData(formData);
        
        if (formData && typeof formData === 'object' && 'locale' in formData) {
          setCurrentLocale((formData as any).locale || 'en');
        }
      }
    } catch (error) {
      console.warn('Could not access content manager context:', error);
      
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const localeParam = urlParams.get('locale');
        if (localeParam) {
          setCurrentLocale(localeParam);
        }
      } catch (urlError) {
        console.warn('Could not parse URL params:', urlError);
      }
    }
  }, []);

  return (
    <TranslatePanel
      currentLocale={currentLocale}
      contentData={contentData}
    />
  );
};