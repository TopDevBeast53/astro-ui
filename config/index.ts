export { awsConfig } from './aws';

function getApiUrl() {
  if (!process.browser) {
    return `${process.env.API_URL}/api/v1/`;
  }

  if (window?.APP_CONFIG?.API_URL) {
    return `${window.APP_CONFIG.API_URL}/api/v1/`;
  }

  return '/api/server/v1/';
}

export const appConfig = {
  API_URL: getApiUrl(),
  LOCAL_WALLET_REDIRECT: process.env.LOCAL_WALLET_REDIRECT,
  STATS_API_URL: process.env.STATS_API_URL,
  DRAFTS_API_URL: process.env.DRAFTS_API_URL,
  APP_DOMAIN: process.env.APP_DOMAIN,
  LAUNCHDARKLY_ID: process.env.NEXT_PUBLIC_LAUNCHDARKLY_ID,
  LAUNCHDARKLY_SDK_KEY: process.env.NEXT_PUBLIC_LAUNCHDARKLY_SDK_KEY,
  NEAR_ENV: process.env.NEAR_ENV,
  AWS_BUCKET: '',
  AWS_REGION: '',
  GOOGLE_ANALYTICS_KEY: process.env.GOOGLE_ANALYTICS_KEY,
  LOG_ROCKET_APP_ID: process.env.LOG_ROCKET_APP_ID,
  DD_APPLICATION_ID: process.env.DD_APPLICATION_ID,
  DD_CLIENT_TOKEN: process.env.DD_CLIENT_TOKEN,
  DD_SERVICE: process.env.DD_SERVICE,
  RELEASE_NOTES: process.env.RELEASE_NOTES,
  I18_RELOAD_ON_PRERENDER: false,
  TOASTS_NOTIFICATIONS_TIMEOUT: 0,
  NEAR_CONTRACT_NAME: process.env.NEAR_CONTRACT_NAME,
  ROKETO_CONTRACT_NAME: process.env.ROKETO_CONTRACT_NAME,
  ROKETO_MULTICALL_NAME: process.env.ROKETO_MULTICALL_NAME,
  TOKEN_FACTORY_CONTRACT_NAME: process.env.TOKEN_FACTORY_CONTRACT_NAME,
  GENERIC_FACTORY_CONTRACT_NAME: process.env.GENERIC_FACTORY_CONTRACT_NAME,
  STAKING_CONTRACT_BINARY_HASH: process.env.STAKING_CONTRACT_BINARY_HASH,
};
