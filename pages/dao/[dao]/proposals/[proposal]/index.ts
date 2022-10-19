import { GetServerSideProps } from 'next';
// eslint-disable-next-line camelcase
import { unstable_serialize } from 'swr';

import { SputnikHttpService } from 'services/sputnik';
import { CookieService } from 'services/CookieService';
import { ACCOUNT_COOKIE } from 'constants/cookies';
import { getDaoContext } from 'features/daos/helpers';
import { getTranslations } from 'utils/getTranslations';
import { getDefaultAppVersion } from 'utils/getDefaultAppVersion';
import { fetcher as getProposal } from 'services/ApiService/hooks/useProposal';

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
  locale = 'en',
}) => {
  CookieService.initServerSideCookies(req?.headers.cookie || null);

  const account = CookieService.get<string | undefined>(ACCOUNT_COOKIE);

  const daoId = query.dao as string;
  const proposalId = query.proposal as string;

  const [proposal, membersStats, daoContext] = await Promise.all([
    getProposal('proposal', daoId, proposalId),
    // SputnikHttpService.getProposalById(proposalId, account),
    SputnikHttpService.getDaoMembersStats(daoId),
    getDaoContext(account, daoId as string),
  ]);

  const dao = daoContext?.dao;

  if (!daoContext || !proposal) {
    return {
      props: {
        ...(await getTranslations(locale)),
        fallback: {
          [unstable_serialize(['proposal', daoId, proposalId])]: proposal,
        },
      },
      redirect: {
        permanent: true,
        destination: `/dao/${daoId}/proposals`,
      },
    };
  }

  return {
    props: {
      ...(await getTranslations(locale)),
      dao,
      membersStats,
      daoContext,
      ...(await getDefaultAppVersion()),
      fallback: {
        [unstable_serialize(['proposal', daoId, proposalId])]: proposal,
      },
    },
  };
};

export { default } from './ProposalPage';
