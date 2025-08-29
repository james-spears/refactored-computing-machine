import {
  ArtifactEntity,
  AssetEntity,
  CriterionEntity,
  Entity,
  GateEntity,
  PermissionEntity,
  ProjectEntity,
  ReleaseEntity,
  Role,
  TeamEntity,
  UserEntity,
} from '@/app/entities';
import {
  AssetDatabase,
  CriterionDatabase,
  ProjectDatabase,
  TeamDatabase,
  UserDatabase,
} from '@/app/database';

export class Model<T extends Entity> {
  entity: T;

  constructor(entity: T) {
    this.entity = entity;
  }

  toJSON() {
    return {
      id: this.entity.id,
    };
  }
}

export class UserModel extends Model<UserEntity> {
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

export class TeamModel extends Model<TeamEntity> {
  name: string;
  users: UserModel[] = [];

  constructor(entity: TeamEntity) {
    super(entity);
    this.name = entity.name;
  }

  async init() {
    this.users = await Promise.all(
      this.entity.userIds.map((id) => UserDatabase.get(id))
    ).then((res) => res.filter((item) => !!item).map((entity) => new UserModel(entity)));
  }

  toJSON() {
    return {
      ...super.toJSON(),
      name: this.name,
      users: JSON.stringify(this.users),
    };
  }
}

export class PermissionModel extends Model<PermissionEntity> {
  team: TeamModel | null = null;
  user: UserModel | null = null;
  role: Role;

  constructor(entity: PermissionEntity) {
    super(entity);
    this.role = entity.role;
  }

  async init(entity: PermissionEntity) {
    this.team = new TeamModel((await TeamDatabase.get(entity.teamId))!);
    this.user = new UserModel((await UserDatabase.get(entity.userId))!);
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

export class AssetModel extends Model<AssetEntity> {
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

export class ArtifactModel extends Model<ArtifactEntity> {
  name: string;
  version: string;
  assets: AssetModel[] = [];

  constructor(entity: ArtifactEntity) {
    super(entity);
    this.name = entity.name;
    this.version = entity.version;
  }

  async init() {
    this.assets = await Promise.all(
      this.entity.assetIds.map((id) => AssetDatabase.get(id))
    ).then((res) => res.filter((item) => !!item).map((entity) => new AssetModel(entity)));
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

export class ProjectModel extends Model<ProjectEntity> {
  name: string;
  assets: AssetModel[] = [];

  constructor(entity: ProjectEntity) {
    super(entity);
    this.name = entity.name;
  }

  async init() {
    this.assets = await Promise.all(
      this.entity.assetIds.map((id) => AssetDatabase.get(id))
    ).then((res) => res.filter((item) => !!item).map((entity) => new AssetModel(entity)));
  }

  toJSON() {
    return {
      ...super.toJSON(),
      name: this.name,
      assets: JSON.stringify(this.assets),
    };
  }
}

export class ReleaseModel extends Model<ReleaseEntity> {
  name: string;
  date: Date;
  projects: ProjectModel[] = [];

  constructor(entity: ReleaseEntity) {
    super(entity);
    this.name = entity.name;
    this.date = new Date();
  }

  async init() {
    this.projects = await Promise.all(
      this.entity.projectIds.map((id) => ProjectDatabase.get(id))
    ).then((res) =>
      res.filter((item) => !!item).map((entity) => new ProjectModel(entity))
    );
  }

  toJSON() {
    return {
      ...super.toJSON(),
      name: this.name,
      date: this.date,
      projects: JSON.stringify(this.projects),
    };
  }
}

export class CriterionModel extends Model<CriterionEntity> {
  name: string;
  description: string;
  approvers: UserModel[] = [];

  constructor(entity: CriterionEntity) {
    super(entity);
    this.name = entity.name;
    this.description = entity.description;
  }

  async init() {
    this.approvers = await Promise.all(
      this.entity.approverIds.map((id) => UserDatabase.get(id))
    ).then((res) => res.filter((item) => !!item).map((entity) => new UserModel(entity)));
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

export class GateModel extends Model<GateEntity> {
  name: string;
  criteria: CriterionModel[] = [];

  constructor(entity: GateEntity) {
    super(entity);
    this.name = entity.name;
  }

  async init() {
    this.criteria = await Promise.all(
      this.entity.criterionIds.map((id) => CriterionDatabase.get(id))
    ).then((res) =>
      res.filter((item) => !!item).map((entity) => new CriterionModel(entity))
    );
  }

  toJSON() {
    return {
      ...super.toJSON(),
      name: this.name,
      criteria: JSON.stringify(this.criteria),
    };
  }
}
