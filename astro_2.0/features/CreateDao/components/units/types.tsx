import { IconName } from 'components/Icon';
import { IDaoCreateForm } from 'astro_2.0/features/CreateDao/components/DaoNameForm/DaoNameForm';

export type DAOType = 'club' | 'cooperative' | 'corporation' | 'foundation';
export type Subject = 'proposals' | 'structure' | 'voting';
export type DAOVotingPowerType = 'democratic' | 'weighted';
export type DAOProposalsType = 'open' | 'closed';
export type DAOStructureType = 'flat' | 'groups';
export type TemplateLinkType = 'custom' | 'predefined';
export type DaoImageType = 'cover' | 'logo';

export interface DAOTemplate {
  title: string;
  description: string;
  variant: DAOType;
  proposals: DAOProposalsType;
  structure: DAOStructureType;
  voting: DAOVotingPowerType;
  disabled?: boolean;
}

export type DaoSettingOption<T> = {
  title: string;
  value: T;
  icon: IconName;
  subject: Subject;
  description: string;
  disabled?: boolean;
};

export interface DAOFormValues extends IDaoCreateForm {
  proposals: DAOProposalsType;
  structure: DAOStructureType;
  voting: DAOVotingPowerType;
}

export type DaoSubjectInfo = {
  subject: Subject;
  title: string;
  subTitle: string;
};

export type DaoImageInfo = {
  title: string;
  description: string;
  requirements: string;
};