import React, { useState } from 'react';
import { Box, Button, Typography, Textarea, Field, Divider, SingleSelect, SingleSelectOption, Modal } from '@strapi/design-system';

interface TranslationResult {
  key: string;
  source: string;
  target: string;
}

interface TranslatePanelProps {
  currentLocale: string;
  contentData: Record<string, any>;
}

const LANGUAGE_OPTIONS = [
  { value: 'zh-CN', label: '中文(简体)' },
  { value: 'zh-TW', label: '中文(繁体)' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
  { value: 'fr', label: 'Français' },
  { value: 'es', label: 'Español' },
  { value: 'de', label: 'Deutsch' },
  { value: 'it', label: 'Italiano' },
  { value: 'pt', label: 'Português' },
  { value: 'ru', label: 'Русский' },
  { value: 'ar', label: 'العربية' },
];

export const TranslatePanel: React.FC<TranslatePanelProps> = ({ currentLocale, contentData }) => {
  const [subject, setSubject] = useState('');
  const [background, setBackground] = useState('');
  const [targetLocale, setTargetLocale] = useState(currentLocale);
  const [isProcessing, setIsProcessing] = useState(false);
  const [translationResults, setTranslationResults] = useState<TranslationResult[]>([]);
  const [showResultsModal, setShowResultsModal] = useState(false);

  const isTextOrRichTextField = (value: any, key: string): boolean => {
    // Check if it's a string (Text field)
    if (typeof value === 'string') {
      return true;
    }
    // Check if it's a rich text field (usually an array or object structure)
    if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
      return true;
    }
    // Check if it contains rich text structure
    if (typeof value === 'object' && value !== null && ('type' in value || 'children' in value)) {
      return true;
    }
    return false;
  };

  const extractTextContent = (value: any): string => {
    if (typeof value === 'string') {
      return value;
    }
    if (Array.isArray(value)) {
      return JSON.stringify(value);
    }
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return '';
  };

  const isFieldEmpty = (value: any): boolean => {
    if (!value) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') {
      return Object.keys(value).length === 0 || JSON.stringify(value) === '{}';
    }
    return true;
  };

  const handleTranslate = async () => {
    setIsProcessing(true);
    
    try {
      console.log('Content data:', contentData);
      
      // Filter and prepare fields for translation
      const fieldsToTranslate = [];
      
      for (const [key, value] of Object.entries(contentData)) {
        if (isTextOrRichTextField(value, key) && isFieldEmpty(value)) {
          const sourceText = extractTextContent(value);
          if (sourceText) {
            fieldsToTranslate.push({
              key,
              source: sourceText
            });
          }
        }
      }
      
      if (fieldsToTranslate.length === 0) {
        console.log('No empty fields to translate');
        setTranslationResults([]);
        return;
      }
      
      // Call the API
      const response = await fetch('/strapi-plugin-ai-translate/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: fieldsToTranslate,
          targetLocale,
          subject,
          background,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.results) {
        setTranslationResults(data.results);
        console.log('Translation results:', data.results);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Translation error:', error);
      // Show error to user or handle gracefully
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box padding={4} background="neutral100" width="100%">
      <Typography variant="beta" as="h2" marginBottom={3}>
        AI 翻译
      </Typography>

      <Box marginBottom={3} width="100%">
        <Typography variant="omega" textColor="neutral600">
          当前语言: <strong>{currentLocale}</strong>
        </Typography>
      </Box>

      <Box marginBottom={3} width="100%">
        <Field.Root>
          <Field.Label>目标语言</Field.Label>
          <SingleSelect value={targetLocale} onChange={setTargetLocale}>
            {LANGUAGE_OPTIONS.map((option) => (
              <SingleSelectOption key={option.value} value={option.value}>
                {option.label}
              </SingleSelectOption>
            ))}
          </SingleSelect>
        </Field.Root>
      </Box>

      <Box width="100%">
        <Field.Root>
          <Field.Label>翻译主题</Field.Label>
          <Textarea
            placeholder="输入翻译的主题或上下文..."
            value={subject}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSubject(e.target.value)}
          />
        </Field.Root>
      </Box>

      <Box marginTop={3} width="100%">
        <Field.Root>
          <Field.Label>背景上下文</Field.Label>
          <Textarea
            placeholder="提供背景信息以提高翻译质量..."
            value={background}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBackground(e.target.value)}
          />
        </Field.Root>
      </Box>

      <Box marginTop={4} width="100%">
        <Button onClick={handleTranslate} loading={isProcessing} disabled={isProcessing} fullWidth>
          处理翻译
        </Button>
      </Box>

      {translationResults.length > 0 && (
        <>
          <Divider marginTop={4} marginBottom={3} />
          <Typography variant="delta" marginBottom={2}>
            翻译完成 ({translationResults.length} 个字段)
          </Typography>
          <Box marginTop={2} width="100%">
            <Button onClick={() => setShowResultsModal(true)} variant="secondary" fullWidth>
              查看翻译结果
            </Button>
          </Box>
        </>
      )}

      <Modal.Root open={showResultsModal} onOpenChange={setShowResultsModal}>
        <Modal.Content>
          <Modal.Header>
            <Typography variant="beta">翻译结果</Typography>
          </Modal.Header>
          <Modal.Body>
            <Box maxHeight="400px" overflow="auto">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <th style={{ width: '20%', padding: '12px 8px', textAlign: 'left', fontSize: '14px', fontWeight: 600 }}>字段</th>
                    <th style={{ width: '40%', padding: '12px 8px', textAlign: 'left', fontSize: '14px', fontWeight: 600 }}>原文</th>
                    <th style={{ width: '40%', padding: '12px 8px', textAlign: 'left', fontSize: '14px', fontWeight: 600 }}>译文</th>
                  </tr>
                </thead>
                <tbody>
                  {translationResults.map((result, index) => (
                    <tr key={index} style={{ borderBottom: index < translationResults.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                      <td style={{ width: '20%', padding: '12px 8px', fontSize: '12px', wordBreak: 'break-word', verticalAlign: 'top' }}>
                        <strong>{result.key}</strong>
                      </td>
                      <td style={{ width: '40%', padding: '12px 8px', fontSize: '12px', wordBreak: 'break-word', verticalAlign: 'top' }}>
                        {result.source}
                      </td>
                      <td style={{ width: '40%', padding: '12px 8px', fontSize: '12px', wordBreak: 'break-word', verticalAlign: 'top' }}>
                        {result.target}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShowResultsModal(false)} variant="secondary">
              关闭
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    </Box>
  );
};
