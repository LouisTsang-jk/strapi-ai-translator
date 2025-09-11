import type { Core } from '@strapi/strapi';

interface TranslationField {
  key: string;
  source: string;
}

interface TranslationParams {
  fields: TranslationField[];
  targetLocale: string;
  subject?: string;
  background?: string;
}

interface TranslationResult {
  key: string;
  source: string;
  target: string;
}

const service = ({ strapi }: { strapi: Core.Strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },

  async translateFields(params: TranslationParams): Promise<TranslationResult[]> {
    const { fields, targetLocale, subject, background } = params;
    const results: TranslationResult[] = [];

    // For now, this is a mock implementation
    // In a real implementation, you would integrate with an AI translation service
    // like OpenAI, Google Translate, or other AI translation APIs
    
    for (const field of fields) {
      try {
        // Mock translation - replace with actual AI translation service
        const mockTranslation = await this.mockTranslateText(
          field.source,
          targetLocale,
          subject,
          background
        );

        results.push({
          key: field.key,
          source: field.source,
          target: mockTranslation,
        });
      } catch (error) {
        console.error(`Translation failed for field ${field.key}:`, error);
        // Include failed translation in results with source text
        results.push({
          key: field.key,
          source: field.source,
          target: field.source, // Fallback to original text
        });
      }
    }

    return results;
  },

  async mockTranslateText(
    text: string,
    targetLocale: string,
    subject?: string,
    background?: string
  ): Promise<string> {
    // Mock implementation - simulate translation delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // This would be replaced with actual AI translation logic
    const context = subject ? `[主题: ${subject}] ` : '';
    const bgContext = background ? `[背景: ${background}] ` : '';
    
    return `${context}${bgContext}[${targetLocale}] ${text}`;
  },
});

export default service;
