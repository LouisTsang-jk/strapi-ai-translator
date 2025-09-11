import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Textarea,
  Field,
  Divider,
} from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { getTranslation } from '../utils/getTranslation';

interface TranslatePanelProps {
  currentLocale: string;
  contentData: Record<string, any>;
}

export const TranslatePanel: React.FC<TranslatePanelProps> = ({
  currentLocale,
  contentData,
}) => {
  const { formatMessage } = useIntl();
  const [subject, setSubject] = useState('');
  const [background, setBackground] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');

  const handleTranslate = async () => {
    setIsProcessing(true);
    try {
      const processedContent = JSON.stringify(contentData, null, 2)
        .split('\n')
        .map(line => `<${line}>`)
        .join('\n');
      
      setResult(processedContent);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box padding={4} background="neutral100">
      <Typography variant="beta" as="h2" marginBottom={3}>
        {formatMessage({
          id: getTranslation('translate.panel.title'),
          defaultMessage: 'AI Translation',
        })}
      </Typography>

      <Box marginBottom={3}>
        <Typography variant="omega" textColor="neutral600">
          {formatMessage({
            id: getTranslation('translate.current-locale'),
            defaultMessage: 'Current Language:',
          })}{' '}
          <strong>{currentLocale}</strong>
        </Typography>
      </Box>

      <Field.Root>
        <Field.Label>
          {formatMessage({
            id: getTranslation('translate.subject.label'),
            defaultMessage: 'Translation Subject',
          })}
        </Field.Label>
        <Field.Input>
          <Textarea
            placeholder={formatMessage({
              id: getTranslation('translate.subject.placeholder'),
              defaultMessage: 'Enter the subject or context for translation...',
            })}
            value={subject}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSubject(e.target.value)}
          />
        </Field.Input>
      </Field.Root>

      <Box marginTop={3}>
        <Field.Root>
          <Field.Label>
            {formatMessage({
              id: getTranslation('translate.background.label'),
              defaultMessage: 'Background Context',
            })}
          </Field.Label>
          <Field.Input>
            <Textarea
              placeholder={formatMessage({
                id: getTranslation('translate.background.placeholder'),
                defaultMessage: 'Provide background information to improve translation quality...',
              })}
              value={background}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBackground(e.target.value)}
            />
          </Field.Input>
        </Field.Root>
      </Box>

      <Box marginTop={4}>
        <Button
          onClick={handleTranslate}
          loading={isProcessing}
          disabled={isProcessing}
          fullWidth
        >
          {formatMessage({
            id: getTranslation('translate.process.button'),
            defaultMessage: 'Process Translation',
          })}
        </Button>
      </Box>

      {result && (
        <>
          <Divider marginTop={4} marginBottom={3} />
          <Typography variant="delta" marginBottom={2}>
            {formatMessage({
              id: getTranslation('translate.result.title'),
              defaultMessage: 'Processing Result',
            })}
          </Typography>
          <Box
            padding={3}
            background="neutral0"
            borderRadius="4px"
            border="1px solid"
            borderColor="neutral200"
          >
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
              {result}
            </pre>
          </Box>
        </>
      )}
    </Box>
  );
};