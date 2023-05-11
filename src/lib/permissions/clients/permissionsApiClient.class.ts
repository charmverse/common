import { ForumPermissionsHttpClient } from '../forums/client/forumPermissionsHttpClient';
import type { PremiumForumPermissionsClient } from '../forums/client/interfaces';
import type { PremiumProposalPermissionsClient } from '../proposals/client/interfaces';
import { ProposalPermissionsHttpClient } from '../proposals/client/proposalPermissionsHttpClient';

import type { PermissionsApiClientConstructor, PremiumPermissionsClient } from './interfaces';

export class PermissionsApiClient implements PremiumPermissionsClient {
  forum: PremiumForumPermissionsClient;

  proposals: PremiumProposalPermissionsClient;

  constructor(params: PermissionsApiClientConstructor) {
    this.forum = new ForumPermissionsHttpClient(params);
    this.proposals = new ProposalPermissionsHttpClient(params);
  }
}
