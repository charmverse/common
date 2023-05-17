// These 2 types are used for reducing a list of pages to a tree
// Generic type A is optional, we can mount additional properties on basic node definitions

import type { Page, PagePermission } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/ban-types
export type PageNode<A = {}> = Pick<
  Page,
  'id' | 'spaceId' | 'type' | 'parentId' | 'index' | 'createdAt' | 'deletedAt'
> &
  Partial<Pick<Page, 'boardId' | 'cardId'>> &
  A;

// eslint-disable-next-line @typescript-eslint/ban-types
export type PageNodeWithChildren<A = {}> = PageNode<{ children: PageNodeWithChildren<A>[] }> & A;

export type PageNodeWithPermissions = PageNode<{
  permissions: (PagePermission & { sourcePermission: PagePermission | null })[];
}>;

/**
 * @rootPageIds The list of roots we want to track
 * @targetPageId Overrides root pageIds. Ensures only the root containing the target page ID will be returned
 * @includeDeletedPages By default, we want to drop deleted pages from the tree.
 */
export interface PageTreeMappingInput<T extends PageNode> {
  items: T[];
  rootPageIds?: string[];
  targetPageId?: string;
  includeDeletedPages?: boolean;
}

/**
 * @pageNodes An existing list of pages from the database which we can use to build the tree. Used in a context where we want to perform multiple resolvePageTree operations without calling the database multiple times
 */
export interface PageTreeResolveInput {
  pageId: string;
  flattenChildren?: boolean;
  includeDeletedPages?: boolean;
  fullPage?: boolean;
  pageNodes?: PageNodeWithPermissions[];
}

export type TargetPageTree<T extends PageNode = PageNode> = {
  parents: PageNodeWithChildren<T>[];
  targetPage: PageNodeWithChildren<T>;
};

/**
 * A target page tree that also contains a pre-computed flat list of children
 */
export type TargetPageTreeWithFlatChildren<T extends PageNode = PageNode> = {
  parents: PageNodeWithChildren<T>[];
  targetPage: PageNodeWithChildren<T>;
  flatChildren: PageNodeWithChildren<T>[];
};

export type PagesRequest = {
  spaceId: string;
  userId?: string;
  archived?: boolean;
  pageIds?: string[];
  search?: string;
  limit?: number;
};
// Page without content and contentText props - used for list of pages (on the client)
export type PageMeta = Pick<
  Page,
  | 'id'
  | 'deletedAt'
  | 'deletedBy'
  | 'createdAt'
  | 'createdBy'
  | 'updatedAt'
  | 'updatedBy'
  | 'title'
  | 'headerImage'
  | 'icon'
  | 'path'
  | 'parentId'
  | 'spaceId'
  | 'type'
  | 'boardId'
  | 'index'
  | 'cardId'
  | 'proposalId'
  | 'bountyId'
  | 'hasContent'
  | 'galleryImage'
>;
export type PageWithPermissions = Page & {
  permissions: (PagePermission & { sourcePermission: PagePermission | null })[];
};

export type PageLifecyleEvent = 'created' | 'repositioned';
