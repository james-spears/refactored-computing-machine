import { UUID } from 'node:crypto';
import {
  ArtifactEntity,
  AssetEntity,
  CriterionEntity,
  Entity,
  GateEntity,
  PermissionEntity,
  ProjectEntity,
  TeamEntity,
  UserEntity,
} from '@/entities';
import { AssetDatabase, CriterionDatabase, TeamDatabase, UserDatabase } from '@/mocks';
import { Role } from '@/types';

export class Model {
  id: UUID;

  constructor(entity: Entity) {
    this.id = entity.id;
  }

  toJSON() {
    return {
      id: this.id,
    };
  }
}

export class UserModel extends Model {
  email: string;
  password: string;

  constructor(entity: UserEntity) {
    super(entity);
    this.email = entity.email;
    this.password = entity.password;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      email: this.email,
      password: '*******',
    };
  }
}

export class TeamModel extends Model {
  name: string;
  users: UserModel[];

  constructor(entity: TeamEntity) {
    super(entity);
    this.name = entity.name;
    this.users = entity.userIds
      .map((id) => UserDatabase.get(id))
      .filter((item) => !!item)
      .map((entity) => new UserModel(entity));
  }

  toJSON() {
    return {
      ...super.toJSON(),
      name: this.name,
      users: JSON.stringify(this.users),
    };
  }
}

export class PermissionModel extends Model {
  team: TeamModel;
  user: UserModel;
  role: Role;

  constructor(entity: PermissionEntity) {
    super(entity);
    this.team = new TeamModel(TeamDatabase.get(entity.teamId)!);
    this.user = new UserModel(UserDatabase.get(entity.userId)!);
    this.role = entity.role;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      team: JSON.stringify(this.team),
      user: JSON.stringify(this.user),
      role: this.role,
    };
  }
}

export class AssetModel extends Model {
  name: string;

  constructor(entity: AssetEntity) {
    super(entity);
    this.name = entity.name;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      name: this.name,
    };
  }
}

export class ArtifactModel extends Model {
  name: string;
  version: string;
  assets: AssetModel[];

  constructor(entity: ArtifactEntity) {
    super(entity);
    this.name = entity.name;
    this.version = entity.version;
    this.assets = entity.assetIds
      .map((id) => AssetDatabase.get(id))
      .filter((item) => !!item)
      .map((entity) => new AssetModel(entity));
  }

  toJSON() {
    return {
      ...super.toJSON(),
      name: this.name,
      version: this.version,
      assets: JSON.stringify(this.assets),
    };
  }
}

export class ProjectModel extends Model {
  name: string;
  assets: AssetModel[];

  constructor(entity: ProjectEntity) {
    super(entity);
    this.name = entity.name;
    this.assets = entity.assetIds
      .map((id) => AssetDatabase.get(id))
      .filter((item) => !!item)
      .map((entity) => new AssetModel(entity));
  }

  toJSON() {
    return {
      ...super.toJSON(),
      name: this.name,
      assets: JSON.stringify(this.assets),
    };
  }
}

export class CriterionModel extends Model {
  name: string;
  description: string;
  approvers: UserModel[];

  constructor(entity: CriterionEntity) {
    super(entity);
    this.name = entity.name;
    this.description = entity.description;
    this.approvers = entity.approverIds
      .map((id) => UserDatabase.get(id))
      .filter((item) => !!item)
      .map((entity) => new UserModel(entity));
  }

  toJSON() {
    return {
      ...super.toJSON(),
      name: this.name,
      description: this.description,
      approvers: JSON.stringify(this.approvers),
    };
  }
}

export class GateModel extends Model {
  name: string;
  criteria: CriterionModel[];

  constructor(entity: GateEntity) {
    super(entity);
    this.name = entity.name;
    this.criteria = entity.criterionIds
      .map((id) => CriterionDatabase.get(id))
      .filter((item) => !!item)
      .map((entity) => new CriterionModel(entity));
  }

  toJSON() {
    return {
      ...super.toJSON(),
      name: this.name,
      criteria: JSON.stringify(this.criteria),
    };
  }
}
