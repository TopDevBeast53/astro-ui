import { yupResolver } from '@hookform/resolvers/yup';
import {
  CropReturnType,
  SelectFlag
} from 'features/create-dao/components/select-flag/SelectFlag';
import {
  LinksFormData,
  schema
} from 'features/dao-settings/components/links-tab';
import { ProposalBanner } from 'features/dao-settings/components/proposal-banner';
import { useDao } from 'hooks/useDao';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import awsUploader from 'services/AwsUploader/AwsUploader';
import { useSWRConfig } from 'swr';

import styles from './flag-tab.module.scss';

interface FlagTabProps {
  daoFlag?: string;
}

const sources = [
  '/flags/flag-1.svg',
  '/flags/flag-2.svg',
  '/flags/flag-3.svg',
  '/flags/flag-4.svg',
  '/flags/flag-5.svg',
  '/flags/flag-6.svg'
];

const FlagTab: FC<FlagTabProps> = ({ daoFlag }) => {
  const router = useRouter();
  const daoId = router.query.dao as string;
  const dao = useDao(daoId);

  const { mutate } = useSWRConfig();
  const [viewMode, setViewMode] = useToggle(true);

  const methods = useForm<LinksFormData>({
    mode: 'onChange',
    defaultValues: {
      details: '',
      externalUrl: ''
    },
    resolver: yupResolver(schema)
  });

  async function onSubmit(data: CropReturnType) {
    await awsUploader.uploadToBucket(data.file);
    await mutate('/daos');
    setViewMode(true);
  }

  const fileName = dao?.id;

  if (!fileName) throw Error('Cannot upload flag. Unknown dao ID');

  return (
    <>
      <FormProvider {...methods}>
        <ProposalBanner
          scope="config"
          title="Flag"
          form="flag"
          onEdit={setViewMode}
          viewMode={viewMode}
          onCancel={setViewMode}
        />
      </FormProvider>
      <div className={styles.root}>
        {viewMode ? (
          <div className={styles.preview}>
            <div>
              {daoFlag
                ? 'Your DAO flag. It looks great!'
                : 'You have no DAO flag yet. Time to create one!'}
            </div>
            <div className="images-container">
              {daoFlag && (
                // eslint-disable-next-line
                <img
                  loading="eager"
                  alt="Result"
                  width={256}
                  height={256}
                  src={daoFlag}
                />
              )}
            </div>
          </div>
        ) : (
          <div className={styles.edit}>
            Move the window around to pick your new flag.
            <div className={styles.cropper}>
              <SelectFlag
                id="flag"
                fileName={fileName}
                sources={sources}
                onSubmit={onSubmit}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FlagTab;
