export type DaoPermission =
  | '*:Finalize'
  | '*:AddProposal'
  | '*:VoteApprove'
  | '*:VoteReject'
  | '*:VoteRemove';

export type DaoRole = {
  createdAt: string;
  id: string;
  name: string;
  kind: 'Everyone' | 'Group';
  balance: null;
  accountIds: string[] | null;
  permissions: DaoPermission[];
  votePolicy: null;
};