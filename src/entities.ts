import { UUID } from 'crypto';
import { Role } from './types';

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

export interface CriterionEntity extends Entity {
  name: string;
  description: string;
  approverIds: UUID[];
}

export interface GateEntity extends Entity {
  name: string;
  criterionIds: UUID[];
}
