import Link from 'next/link';
import React, { FC } from 'react';

import { Icon, IconName } from 'components/Icon';

import styles from './app-footer.module.scss';

export interface AppFooterProps {
  isLandingPage?: boolean;
  isLoggedIn?: boolean;
}

export const AppFooter: FC<AppFooterProps> = ({
  isLandingPage,
  isLoggedIn
}) => {
  function renderSocialIcon(href: string, icon: IconName) {
    return (
      <a href={href} rel="noopener noreferrer" target="_blank">
        <Icon name={icon} width={24} className={styles.icon} />
      </a>
    );
  }

  function renderPrivacyAndPolicySection() {
    // <Link passHref href="/policy">
    //   <a href="*" className={styles.link}>
    //     Privacy Policy
    //   </a>
    // </Link>
    // <Link passHref href="/terms">
    //   <a href="*" className={styles.link}>
    //     Terms of Use
    //   </a>
    // </Link>

    return 'Community developed. Not audited. Use at your own risk.';
  }

  return (
    <footer className={styles.root}>
      <div
        className={isLandingPage || !isLoggedIn ? styles.bottom : styles.side}
      >
        <div className={styles.wrapper}>
          {(isLandingPage || !isLoggedIn) && (
            <div className={styles.invitation}>
              <i>
                <Icon name="buttonBookmark" width={32} />
              </i>
              <span>Need a NEAR account?</span>
              <span>
                Create one{' '}
                <Link passHref href="/register">
                  <a href="*" className={styles.register}>
                    here
                  </a>
                </Link>
                .
              </span>
            </div>
          )}
          <div className={styles.social}>
            {/* {renderSocialIcon('https://discord.com/', 'socialDiscord')} */}
            {renderSocialIcon('https://twitter.com/AstroDao', 'socialTwitter')}
            {/* {renderSocialIcon('https://github.com/', 'socialGithub')} */}
            {renderSocialIcon('https://t.me/astro_near', 'socialTelegram')}
          </div>
          <div className={styles.report}>
            <a href="https://airtable.com/shr4ZmQzmTE5cKZm3">Report an issue</a>
          </div>
          <div className={styles.links}>{renderPrivacyAndPolicySection()}</div>
          <div className={styles.copyright}>
            SputnikDAO 2021. The software is an&nbsp;open source and provided
            “as&nbsp;is”, without warranty of&nbsp;any kind.
          </div>
          <div className={styles.powered}>
            <span>powered by</span>
            <i>
              <Icon name="logoNearFull" width={77} className={styles.logo} />
            </i>
          </div>
          <div className={styles.version}>Version: RC-20.5</div>
        </div>
      </div>
    </footer>
  );
};
