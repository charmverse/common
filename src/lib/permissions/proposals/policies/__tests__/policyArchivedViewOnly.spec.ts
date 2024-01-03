import type { Space, User } from '@prisma/client';

import { proposalResolver } from '..';
import { generateProposal } from '../../../../testing/proposals';
import { generateSpaceUser, generateUserAndSpace } from '../../../../testing/user';
import { AvailableSpacePermissions } from '../../../spaces/availableSpacePermissions';
import { AvailableProposalPermissions } from '../../availableProposalPermissions.class';
import type { ProposalPermissionFlags } from '../../interfaces';
import type { ProposalResource } from '../interfaces';
import { policyArchivedViewOnly } from '../policyArchivedViewOnly';

let proposal: ProposalResource;
let space: Space;
let adminUser: User;
let proposalAuthor: User;
let proposalReviewer: User;
let spaceMember: User;

beforeAll(async () => {
  const generated = await generateUserAndSpace({
    isAdmin: true
  });

  adminUser = generated.user;
  space = generated.space;
  proposalAuthor = await generateSpaceUser({ isAdmin: false, spaceId: space.id });
  spaceMember = await generateSpaceUser({ isAdmin: false, spaceId: space.id });
  proposalReviewer = await generateSpaceUser({ isAdmin: false, spaceId: space.id });

  proposal = await generateProposal({
    authors: [proposalAuthor.id],
    archived: true,
    spaceId: space.id,
    userId: proposalAuthor.id,
    reviewers: [
      {
        userId: proposalReviewer.id
      }
    ]
  }).then((_proposal) => proposalResolver({ resourceId: _proposal.id }));
});

const fullPermissions = new AvailableProposalPermissions().full;

describe('policyArchivedViewOnly', () => {
  it('should perform a no-op if proposal is not archived', async () => {
    const permissions = await policyArchivedViewOnly({
      flags: { ...fullPermissions, move: false },
      isAdmin: false,
      resource: { ...proposal, archived: false },
      userId: proposalAuthor.id
    });

    expect(permissions).toMatchObject<ProposalPermissionFlags>({
      view: true,
      edit: true,
      delete: true,
      comment: true,
      create_vote: true,
      review: true,
      vote: true,
      make_public: true,
      archive: true,
      unarchive: true,
      evaluate: true,
      move: false
    });
  });

  it('should allow authors to view, make public, delete, archive and unarchive', async () => {
    const permissions = await policyArchivedViewOnly({
      flags: { ...fullPermissions, move: false },
      isAdmin: false,
      resource: proposal,
      userId: proposalAuthor.id
    });

    expect(permissions).toMatchObject<ProposalPermissionFlags>({
      view: true,
      vote: false,
      make_public: true,
      create_vote: false,
      comment: false,
      delete: true,
      edit: false,
      review: false,
      archive: true,
      unarchive: true,
      evaluate: false,
      move: false
    });
  });

  it('should preserve space-wide delete and archive permissions when space wide proposal deletion is allowed', async () => {
    const permissions = await policyArchivedViewOnly({
      flags: { ...fullPermissions, move: false },
      isAdmin: false,
      resource: proposal,
      userId: spaceMember.id,
      preComputedSpacePermissionFlags: new AvailableSpacePermissions().addPermissions(['deleteAnyProposal'])
        .operationFlags
    });

    expect(permissions).toMatchObject<ProposalPermissionFlags>({
      view: true,
      delete: true,
      archive: true,
      unarchive: true,
      edit: false,
      comment: false,
      create_vote: false,
      review: false,
      vote: false,
      make_public: false,
      evaluate: false,
      move: false
    });
  });

  it('should allow admins to view, make public and delete', async () => {
    const permissions = await policyArchivedViewOnly({
      flags: { ...fullPermissions, move: false },
      isAdmin: true,
      resource: proposal,
      userId: adminUser.id
    });

    expect(permissions).toMatchObject<ProposalPermissionFlags>({
      view: true,
      make_public: true,
      delete: true,
      vote: false,
      create_vote: false,
      comment: false,
      edit: false,
      review: false,
      archive: true,
      unarchive: true,
      evaluate: false,
      move: false
    });
  });

  it('should allow users only to view', async () => {
    const users = [proposalReviewer, spaceMember];

    for (const user of users) {
      const permissions = await policyArchivedViewOnly({
        flags: { ...fullPermissions, move: false },
        isAdmin: false,
        resource: proposal,
        userId: user.id
      });

      expect(permissions).toMatchObject<ProposalPermissionFlags>({
        view: true,
        vote: false,
        make_public: false,
        create_vote: false,
        comment: false,
        delete: false,
        edit: false,
        review: false,
        archive: false,
        unarchive: false,
        evaluate: false,
        move: false
      });
    }
  });
});
