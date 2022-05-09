import React, { FC, useCallback } from 'react';
import { useAsyncFn } from 'react-use';
import { useWalletContext } from 'context/WalletContext';
import { SputnikHttpService } from 'services/sputnik';

import { Icon } from 'components/Icon';
import { Button } from 'components/button/Button';
import { useModal } from 'components/modal';
import { SaveFcTemplateModal } from 'astro_2.0/features/ViewProposal/components/SaveFcTemplate/components/SaveFcTemplateModal';
import { LoadingIndicator } from 'astro_2.0/components/LoadingIndicator';

import { ProposalFeedItem } from 'types/proposal';

import styles from './SaveFcTemplate.module.scss';

interface Props {
  proposal: ProposalFeedItem;
}

export const SaveFcTemplate: FC<Props> = ({ proposal }) => {
  const { accountId } = useWalletContext();

  const [{ loading }, getDaosList] = useAsyncFn(async () => {
    return SputnikHttpService.getAccountDaos(accountId);
  }, [accountId]);

  const [showModal] = useModal(SaveFcTemplateModal);

  const handleClick = useCallback(async () => {
    const accountDaos = await getDaosList();

    await showModal({ accountDaos, proposal });
  }, [getDaosList, proposal, showModal]);

  return (
    <div className={styles.root}>
      <Button
        size="small"
        variant="tertiary"
        capitalize
        className={styles.control}
        onClick={handleClick}
      >
        <span className={styles.label}>Save template</span>
        {loading ? (
          <LoadingIndicator className={styles.loading} />
        ) : (
          <Icon name="bookmark" className={styles.icon} />
        )}
      </Button>
    </div>
  );
};