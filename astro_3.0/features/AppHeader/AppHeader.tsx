import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';

import { AppLogo } from 'astro_3.0/features/AppHeader/components/AppLogo';

import { useWalletContext } from 'context/WalletContext';

import { NotificationsBell } from 'astro_2.0/components/AppHeader/components/NotificationsBell';
import { MainLayout } from 'astro_3.0/features/MainLayout';
import { SearchBar } from 'astro_3.0/features/SearchBar';
import { AppHealth } from 'astro_2.0/features/AppHealth';
import { AccountDropdown } from 'astro_2.0/components/AppHeader/components/AccountDropdown';
import { MobileDaosMenu } from 'astro_3.0/features/AppHeader/components/MobileDaosMenu';

import styles from './AppHeader.module.scss';

export const AppHeader: FC = () => {
  const { t } = useTranslation('common');
  const { accountId } = useWalletContext();

  return (
    <div className={styles.root}>
      <div className={styles.mobileMenu}>
        <MobileDaosMenu />
      </div>
      <div className={styles.logoWrapper}>
        <AppLogo />
      </div>

      <MainLayout className={styles.main}>
        <SearchBar
          withSideBar
          placeholder={t('header.search.placeholder')}
          className={styles.search}
        />
      </MainLayout>

      <div className={styles.rightSection}>
        <AppHealth />
        {!!accountId && <NotificationsBell className={styles.bell} />}
        <AccountDropdown />
      </div>
    </div>
  );
};
