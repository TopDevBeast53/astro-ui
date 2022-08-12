import React, { FC, useCallback } from 'react';
import { useTranslation } from 'next-i18next';

import { useModal } from 'components/modal';
import { ConfirmModal } from 'astro_2.0/features/pages/nestedDaoPagesContent/CustomFunctionCallTemplatesPageContent/components/CustomFcTemplateCard/ConfirmModal';
import { CommentAction } from 'astro_2.0/features/Comments/components/CommentActions/CommentAction';

import styles from './CommentActions.module.scss';

interface Props {
  onEdit: () => void;
  onDelete: (id: string) => Promise<void>;
  id: string;
  isEditable: boolean;
}

export const CommentActions: FC<Props> = ({
  onEdit,
  onDelete,
  id,
  isEditable,
}) => {
  const { t } = useTranslation();
  const [showModal] = useModal(ConfirmModal);

  const handleDelete = useCallback(async () => {
    const res = await showModal({
      title: 'Delete comment',
      message: 'Are you sure you want to delete selected comment?',
    });

    if (res[0]) {
      await onDelete(id);
    }
  }, [id, onDelete, showModal]);

  if (!isEditable) {
    return null;
  }

  return (
    <div className={styles.root}>
      <CommentAction
        overlayText={t('drafts.comments.deleteButton')}
        icon="buttonDelete"
        onClick={handleDelete}
      />
      <CommentAction
        overlayText={t('drafts.comments.editButton')}
        icon="buttonEdit"
        onClick={onEdit}
      />
    </div>
  );
};
