import { GetServerSideProps } from 'next';
import nextI18NextConfig from 'next-i18next.config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ACCOUNT_COOKIE } from 'constants/cookies';

import { CookieService } from 'services/CookieService';
import { NotificationsService } from 'services/NotificationsService';

import MyAccountPage, { MyAccountPageProps } from './MyAccountPage';

export const getServerSideProps: GetServerSideProps<MyAccountPageProps> = async ({
  locale = 'en',
}) => {
  const accountId = CookieService.get<string | undefined>(ACCOUNT_COOKIE);

  const contactsConfig = await NotificationsService.getUserContactConfig(
    accountId
  );

  return {
    props: {
      contactsConfig,
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
};

export default MyAccountPage;