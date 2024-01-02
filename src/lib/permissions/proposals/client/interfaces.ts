import type { ListProposalsRequest } from '../../../proposals/interfaces';
import type { PermissionCompute } from '../../core/interfaces';
import type { ProposalPermissionFlags, ProposalPermissionsSwitch } from '../interfaces';

// eslint-disable-next-line @typescript-eslint/ban-types
export type BaseProposalPermissionsClient = {};
// eslint-disable-next-line @typescript-eslint/ban-types
export type PremiumProposalPermissionsClient = BaseProposalPermissionsClient & {
  computeProposalPermissions: (
    request: PermissionCompute & ProposalPermissionsSwitch
  ) => Promise<ProposalPermissionFlags>;

  /**
   * A method for getting the users' permissions on each step of the workflow
   * Each key in the result is permissions for that evaluationId
   */
  computeAllProposalEvaluationPermissions: (
    request: PermissionCompute & ProposalPermissionsSwitch
  ) => Promise<Record<string, ProposalPermissionFlags>>;

  // This will be the new method used for proposals with evaluation step
  getAccessibleProposalIds: (request: ListProposalsRequest & ProposalPermissionsSwitch) => Promise<string[]>;
  computeBaseProposalPermissions: (
    request: PermissionCompute & ProposalPermissionsSwitch
  ) => Promise<ProposalPermissionFlags>;
};
