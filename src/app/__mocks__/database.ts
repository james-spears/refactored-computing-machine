import {
  artifacts,
  assets,
  criteria,
  Database,
  gates,
  permissions,
  projects,
  releases,
  teams,
  users,
} from './utils';

export const UserDatabase = new Database(users);
export const TeamDatabase = new Database(teams);
export const PermissionDatabase = new Database(permissions);
export const AssetDatabase = new Database(assets);
export const ArtifactDatabase = new Database(artifacts);
export const ProjectDatabase = new Database(projects);
export const CriterionDatabase = new Database(criteria);
export const GateDatabase = new Database(gates);
export const ReleaseDatabase = new Database(releases);
