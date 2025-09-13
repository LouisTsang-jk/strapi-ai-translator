import { Main } from '@strapi/design-system';
import { useIntl } from 'react-intl';

// import { getTranslation } from '../utils/getTranslation';

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <Main>
      <h1>Welcome to AI Translate</h1>
      <p>AI Translate</p>
    </Main>
  );
};

export { HomePage };
