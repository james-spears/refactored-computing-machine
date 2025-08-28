import { UUID } from 'crypto';
import {
  ArtifactEntity,
  AssetEntity,
  CriterionEntity,
  GateEntity,
  PermissionEntity,
  ProjectEntity,
  TeamEntity,
  UserEntity,
} from './entities';

export interface Filter {}

export interface Repository<T> {
  add(entity: T): void;
  get(id: UUID): T | void;
  remove(id: UUID): T | void;
  list(filter?: Filter): T[];
}

export interface UserRepository extends Repository<UserEntity> {}

export interface TeamRepository extends Repository<TeamEntity> {}

export interface PermissionRepository extends Repository<PermissionEntity> {}

export interface AssetRepository extends Repository<AssetEntity> {}

export interface ArtifactRepository extends Repository<ArtifactEntity> {}

export interface ProjectRepository extends Repository<ProjectEntity> {}

export interface CriterionRepository extends Repository<CriterionEntity> {}

export interface GateRepository extends Repository<GateEntity> {}
