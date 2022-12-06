import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { formatDistanceToNow } from 'date-fns';

import { NoResultsView } from 'astro_2.0/components/NoResultsView';
import { DATA_SEPARATOR } from 'constants/common';
import { getDaoAvatar } from 'astro_3.0/features/Sidebar/helpers';
import { IconButton } from 'components/button/IconButton';
import { formatYoktoValue, kFormatter } from 'utils/format';

import { BountyIndex } from 'services/SearchService/types';
import { ProposalType } from 'types/proposal';

import { DaoFeedItem } from 'types/dao';
import styles from './BountiesList.module.scss';

interface BountiesListProps {
  bounties: BountyIndex[];
}

export const BountiesList: FC<BountiesListProps> = ({ bounties }) => {
  const router = useRouter();

  if (!bounties?.length) {
    return <NoResultsView title="no results" />;
  }

  return (
    <div className={styles.bountiesList}>
      {/* Headers */}
      <div className={styles.header}>
        <div />
        <div />
        <div>ORG</div>
        <div>TYPE</div>
        <div>DESCRIPTION</div>
        <div>TAGS</div>
        <div>RECENCY</div>
        <div>AMOUNT</div>
        <div />
        <div />
      </div>

      {/* Body */}
      {bounties.map(bounty => {
        const desc = bounty?.description || bounty?.proposal?.description || '';
        const description = desc.split(DATA_SEPARATOR)[0];
        const daoLogo = getDaoAvatar(
          bounty.proposal?.dao?.metadata as DaoFeedItem
        );

        const timestamp =
          bounty.creatingTimeStamp ?? bounty.processingTimeStamp;

        let recency = 'N/A';

        if (timestamp) {
          recency = formatDistanceToNow(new Date(timestamp));
        }

        let amount = '0';

        if (bounty.proposal?.kind?.type === ProposalType.AddBounty) {
          amount = kFormatter(
            Number(formatYoktoValue(bounty.proposal?.kind?.bounty?.amount)),
            2
          );
        }

        return (
          <div className={styles.row}>
            <div>
              <IconButton
                size="medium"
                icon="buttonBookmark2"
                className={styles.icon}
                onClick={() => {
                  // TODO
                }}
              />
            </div>

            <div>
              <div
                className={styles.daoLogo}
                style={{
                  backgroundImage: `url(${daoLogo})`,
                }}
              />
            </div>
            <div className={styles.daoName}>{bounty.proposal?.dao?.name}</div>

            <div className={styles.bountyType}>
              {bounty.proposal?.kind?.type}
            </div>
            <div>{description}</div>
            <div className={styles.tags}>
              {bounty.tags?.map((tag: string) => `#${tag}`).join(', ')}
            </div>
            <div>{recency}</div>
            <div className={styles.amount}>{amount} NEAR</div>
            <div>
              <IconButton
                size="medium"
                icon="buttonShare"
                className={styles.icon}
                onClick={() => {
                  // TODO
                }}
              />
            </div>
            <div>
              <IconButton
                size="medium"
                icon="buttonArrowRight"
                className={styles.icon}
                onClick={() =>
                  router.push({
                    pathname: '/dao/[dao]/proposals/[proposal]',
                    query: {
                      dao: bounty.daoId,
                      proposal: bounty.proposalId,
                    },
                  })
                }
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
