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
  ReleaseEntity,
  JSONDateString,
  Role,
} from '@/app/entities';
import { Repository } from '@/app/repositories';
import { randomUUID, UUID } from 'node:crypto';

export class Database<T extends Entity> implements Repository<T> {
  objects: T[];

  constructor(objects: T[]) {
    this.objects = objects;
  }

  async add(entity: T): Promise<string> {
    this.objects.push(entity);
    return entity.id;
  }

  async get(filter: Record<string, unknown>): Promise<T | undefined> {
    return this.objects.find((item) => item.id === filter.id);
  }

  async remove(id: string): Promise<boolean> {
    const index = this.objects.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.objects.splice(index, 1)[0];
      return true;
    } else {
      return false;
    }
  }

  async update(entity: Partial<T> & Pick<T, 'id'>): Promise<string | undefined> {
    const index = this.objects.findIndex((item) => item.id === entity.id);
    if (index !== -1) {
      this.objects[index] = { ...this.objects[index], ...entity };
      return this.objects[index].id;
    }
  }

  async list(): Promise<T[]> {
    return this.objects;
  }
}

export function getRandomItem<T>(arr: Array<T>): T {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

export const mockUser: () => UserEntity = () => ({
  id: randomUUID(),
  email: `joe_${Math.ceil(Math.random() * 1000)}@example.com`,
  password: '@ABC123xyz',
});

export const users: UserEntity[] = [];

for (let i = 0; i < 40; i++) {
  users.push(mockUser());
}

export const mockTeam: () => TeamEntity = () => {
  const userIds: UUID[] = [];
  for (let i = 0; i < 5; i++) {
    const item = getRandomItem(users);
    if (!userIds.includes(item.id)) {
      userIds.push(item.id);
    }
  }
  return {
    id: randomUUID(),
    name: `Team ${Math.ceil(Math.random() * 1000)}`,
    userIds,
  };
};

export const teams: TeamEntity[] = [];

for (let i = 0; i < 10; i++) {
  teams.push(mockTeam());
}

export const mockPermission: () => PermissionEntity = () => {
  const team = getRandomItem(teams);
  const userId = getRandomItem(team.userIds);
  return {
    id: randomUUID(),
    teamId: team.id,
    userId,
    role: getRandomItem(Object.values(Role)),
  };
};

export const permissions: PermissionEntity[] = [];

for (let i = 0; i < 50; i++) {
  permissions.push(mockPermission());
}

export const mockAsset: () => AssetEntity = () => {
  return {
    id: randomUUID(),
    name: `Asset ${Math.ceil(Math.random() * 1000)}`,
  };
};

export const assets: AssetEntity[] = [];

for (let i = 0; i < 30; i++) {
  assets.push(mockAsset());
}

export const mockArtifact: () => ArtifactEntity = () => {
  const assetIds: UUID[] = [];
  for (let i = 0; i < 5; i++) {
    const item = getRandomItem(assets);
    if (!assetIds.includes(item.id)) {
      assetIds.push(item.id);
    }
  }
  return {
    id: randomUUID(),
    name: `Artifact ${Math.ceil(Math.random() * 1000)}`,
    version: `v${Math.ceil(Math.random() * 10)}.${Math.ceil(Math.random() * 10)}.${Math.ceil(Math.random() * 10)}`,
    assetIds,
  };
};

export const artifacts: ArtifactEntity[] = [];

for (let i = 0; i < 500; i++) {
  artifacts.push(mockArtifact());
}

export const mockProject: () => ProjectEntity = () => {
  const assetIds: UUID[] = [];
  for (let i = 0; i < 10; i++) {
    const item = getRandomItem(assets);
    if (!assetIds.includes(item.id)) {
      assetIds.push(item.id);
    }
  }
  return {
    id: randomUUID(),
    name: `Project ${Math.ceil(Math.random() * 1000)}`,
    assetIds,
  };
};

export const projects: ProjectEntity[] = [];

for (let i = 0; i < 20; i++) {
  projects.push(mockProject());
}

export const mockRelease: () => ReleaseEntity = () => {
  const projectIds: UUID[] = [];
  for (let i = 0; i < 10; i++) {
    const item = getRandomItem(projects);
    if (!projectIds.includes(item.id)) {
      projectIds.push(item.id);
    }
  }
  return {
    id: randomUUID(),
    name: `Release ${Math.ceil(Math.random() * 1000)}`,
    date: new Date().toJSON() as JSONDateString,
    projectIds,
  };
};

export const releases: ReleaseEntity[] = [];

for (let i = 0; i < 15; i++) {
  releases.push(mockRelease());
}

export const mockCriterion: () => CriterionEntity = () => {
  const approverIds: UUID[] = [];
  for (let i = 0; i < 5; i++) {
    const item = getRandomItem(users);
    if (!approverIds.includes(item.id)) {
      approverIds.push(item.id);
    }
  }
  return {
    id: randomUUID(),
    name: `Criterion ${Math.ceil(Math.random() * 1000)}`,
    description: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore 
      magna aliqua. Ut enim ad minim veniam, quis nostrud 
      exercitation ullamco laboris nisi ut aliquip ex ea 
      commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla 
      pariatur.
    `,
    approverIds,
  };
};

export const criteria: CriterionEntity[] = [];

for (let i = 0; i < 100; i++) {
  criteria.push(mockCriterion());
}

export const mockGate: () => GateEntity = () => {
  const criterionIds: UUID[] = [];
  for (let i = 0; i < 15; i++) {
    const item = getRandomItem(criteria);
    if (!criterionIds.includes(item.id)) {
      criterionIds.push(item.id);
    }
  }
  return {
    id: randomUUID(),
    name: `Gate ${Math.ceil(Math.random() * 1000)}`,
    criterionIds,
  };
};

export const gates: GateEntity[] = [];

for (let i = 0; i < 25; i++) {
  gates.push(mockGate());
}