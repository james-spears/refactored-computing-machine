import { UUID } from 'crypto';

export enum Role {
  RELEASE_MANAGER = 'RELEASE_MANAGER',
  STAKE_HOLDER = 'STAKE_HOLDER',
  AUDITOR = 'AUDITOR',
  LEAD_DEVELOPER = 'LEAD_DEVELOPER',
  DEVELOPER = 'DEVELOPER',
  LEAD_QA = 'LEAD_QA',
  QA = 'QA',
}

export interface Entity {
  id: UUID;
}

export interface UserEntity extends Entity {
  email: string;
  password: string;
}

export interface TeamEntity extends Entity {
  name: string;
  userIds: UUID[];
}

export interface PermissionEntity extends Entity {
  teamId: UUID;
  userId: UUID;
  role: Role;
}

export interface AssetEntity extends Entity {
  name: string;
}

export interface ArtifactEntity extends Entity {
  name: string;
  version: string;
  assetIds: UUID[];
}

export interface ProjectEntity extends Entity {
  name: string;
  assetIds: UUID[];
}

export type JSONDateString =
  `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;
export interface ReleaseEntity extends Entity {
  name: string;
  date: JSONDateString;
  projectIds: UUID[];
}

export interface CriterionEntity extends Entity {
  name: string;
  description: string;
  approverIds: UUID[];
}

export interface GateEntity extends Entity {
  name: string;
  criterionIds: UUID[];
}
