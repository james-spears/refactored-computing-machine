import {
  ArtifactEntity,
  AssetEntity,
  CriterionEntity,
  Entity,
  GateEntity,
  PermissionEntity,
  ProjectEntity,
  ReleaseEntity,
  TeamEntity,
  UserEntity,
} from './entities';

// export interface Filter {}

export interface Repository<T extends Entity> {
  add(entity: T): Promise<string | undefined>;
  get(id: string): Promise<T | undefined>;
  remove(id: string): Promise<boolean>;
  update(update: Partial<T> & Pick<T, 'id'>): Promise<string | undefined>;
  list(): Promise<T[]>;
}

export type UserRepository = Repository<UserEntity>;

export type TeamRepository = Repository<TeamEntity>;

export type PermissionRepository = Repository<PermissionEntity>;

export type AssetRepository = Repository<AssetEntity>;

export type ArtifactRepository = Repository<ArtifactEntity>;

export type ProjectRepository = Repository<ProjectEntity>;

export type ReleaseRepository = Repository<ReleaseEntity>;

export type CriterionRepository = Repository<CriterionEntity>;

export type GateRepository = Repository<GateEntity>;
