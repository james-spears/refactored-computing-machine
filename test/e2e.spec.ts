// tests/product.test.js
import request from 'supertest';
import { app, server } from '@/index'; // Adjust path as needed
import {
  users,
  getRandomItem,
  mockUser,
  permissions,
  mockPermission,
  mockTeam,
  teams,
  releases,
  mockRelease,
  projects,
  mockProject,
  mockAsset,
  assets,
  mockArtifact,
  artifacts,
  mockGate,
  gates,
  criteria,
} from '@/app/__mocks__/utils';
import {
  ArtifactEntity,
  AssetEntity,
  CriterionEntity,
  GateEntity,
  PermissionEntity,
  ProjectEntity,
  ReleaseEntity,
  TeamEntity,
  UserEntity,
  Role,
} from '@/app/entities';
jest.mock('@/app/database');
jest.mock('jose');

describe('API E2E Tests', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    server.close();
  });

  describe('Users', () => {
    it('get', async () => {
      const entity = getRandomItem<UserEntity>(users);
      const res = await request(app).get(`/api/v1/users/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(entity.id);
    });

    it('list', async () => {
      const res = await request(app).get('/api/v1/users');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('add + update + remove', async () => {
      // add
      let entity = mockUser();
      let res = await request(app).get(`/api/v1/users/${entity.id}`);
      expect(res.statusCode).toEqual(404);
      res = await request(app).post('/api/v1/users').send(entity);
      expect(res.statusCode).toEqual(201);
      res = await request(app).get(`/api/v1/users/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(entity.id);

      // update
      entity.email = entity.email.split('.com')[0] + '.me';
      res = await request(app).patch('/api/v1/users').send(entity);
      expect(res.statusCode).toEqual(200);
      res = await request(app).get(`/api/v1/users/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.email).toBe(entity.email);

      // remove
      res = await request(app).delete(`/api/v1/users/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      res = await request(app).get(`/api/v1/users/${entity.id}`);
      expect(res.statusCode).toEqual(404);
      res = await request(app).delete(`/api/v1/users/${entity.id}`);
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('Permissions', () => {
    it('get', async () => {
      const entity = getRandomItem<PermissionEntity>(permissions);
      const res = await request(app).get(`/api/v1/permissions/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(entity.id);
    });

    it('list', async () => {
      const res = await request(app).get('/api/v1/permissions');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('add + update + remove', async () => {
      // add
      let entity = mockPermission();
      let res = await request(app).get(`/api/v1/permissions/${entity.id}`);
      expect(res.statusCode).toEqual(404);
      res = await request(app).post('/api/v1/permissions').send(entity);
      expect(res.statusCode).toEqual(201);
      res = await request(app).get(`/api/v1/permissions/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(entity.id);

      // update
      let role = getRandomItem(Object.values(Role));
      while (role === entity.role) {
        role = getRandomItem(Object.values(Role));
      }
      entity.role = role;
      res = await request(app).patch('/api/v1/permissions').send(entity);
      expect(res.statusCode).toEqual(200);
      res = await request(app).get(`/api/v1/permissions/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.role).toBe(entity.role);

      // remove
      res = await request(app).delete(`/api/v1/permissions/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      res = await request(app).get(`/api/v1/permissions/${entity.id}`);
      expect(res.statusCode).toEqual(404);
      res = await request(app).delete(`/api/v1/permissions/${entity.id}`);
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('Teams', () => {
    it('get', async () => {
      const entity = getRandomItem<TeamEntity>(teams);
      const res = await request(app).get(`/api/v1/teams/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(entity.id);
    });

    it('list', async () => {
      const res = await request(app).get('/api/v1/teams');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('add + update + remove', async () => {
      // add
      let entity = mockTeam();
      let res = await request(app).get(`/api/v1/teams/${entity.id}`);
      expect(res.statusCode).toEqual(404);
      res = await request(app).post('/api/v1/teams').send(entity);
      expect(res.statusCode).toEqual(201);
      res = await request(app).get(`/api/v1/teams/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(entity.id);

      // update
      entity.name = entity.name + '!';
      res = await request(app).patch('/api/v1/teams').send(entity);
      expect(res.statusCode).toEqual(200);
      res = await request(app).get(`/api/v1/teams/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toBe(entity.name);

      // remove
      res = await request(app).delete(`/api/v1/teams/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      res = await request(app).get(`/api/v1/teams/${entity.id}`);
      expect(res.statusCode).toEqual(404);
      res = await request(app).delete(`/api/v1/teams/${entity.id}`);
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('Releases', () => {
    it('get', async () => {
      const entity = getRandomItem<ReleaseEntity>(releases);
      const res = await request(app).get(`/api/v1/releases/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(entity.id);
    });

    it('list', async () => {
      const res = await request(app).get('/api/v1/releases');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('add + update + remove', async () => {
      // add
      let entity = mockRelease();
      let res = await request(app).get(`/api/v1/releases/${entity.id}`);
      expect(res.statusCode).toEqual(404);
      res = await request(app).post('/api/v1/releases').send(entity);
      expect(res.statusCode).toEqual(201);
      res = await request(app).get(`/api/v1/releases/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(entity.id);

      // update
      entity.name = entity.name + '!';
      res = await request(app).patch('/api/v1/releases').send(entity);
      expect(res.statusCode).toEqual(200);
      res = await request(app).get(`/api/v1/releases/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toBe(entity.name);

      // remove
      res = await request(app).delete(`/api/v1/releases/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      res = await request(app).get(`/api/v1/releases/${entity.id}`);
      expect(res.statusCode).toEqual(404);
      res = await request(app).delete(`/api/v1/releases/${entity.id}`);
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('Projects', () => {
    it('get', async () => {
      const entity = getRandomItem<ProjectEntity>(projects);
      const res = await request(app).get(`/api/v1/projects/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(entity.id);
    });

    it('list', async () => {
      const res = await request(app).get('/api/v1/projects');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('add + update + remove', async () => {
      // add
      let entity = mockProject();
      let res = await request(app).get(`/api/v1/projects/${entity.id}`);
      expect(res.statusCode).toEqual(404);
      res = await request(app).post('/api/v1/projects').send(entity);
      expect(res.statusCode).toEqual(201);
      res = await request(app).get(`/api/v1/projects/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(entity.id);

      // update
      entity.name = entity.name + '!';
      res = await request(app).patch('/api/v1/projects').send(entity);
      expect(res.statusCode).toEqual(200);
      res = await request(app).get(`/api/v1/projects/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toBe(entity.name);

      // remove
      res = await request(app).delete(`/api/v1/projects/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      res = await request(app).get(`/api/v1/projects/${entity.id}`);
      expect(res.statusCode).toEqual(404);
      res = await request(app).delete(`/api/v1/projects/${entity.id}`);
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('Assets', () => {
    it('get', async () => {
      const entity = getRandomItem<AssetEntity>(assets);
      const res = await request(app).get(`/api/v1/assets/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(entity.id);
    });

    it('list', async () => {
      const res = await request(app).get('/api/v1/assets');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('add + update + remove', async () => {
      // add
      let entity = mockAsset();
      let res = await request(app).get(`/api/v1/assets/${entity.id}`);
      expect(res.statusCode).toEqual(404);
      res = await request(app).post('/api/v1/assets').send(entity);
      expect(res.statusCode).toEqual(201);
      res = await request(app).get(`/api/v1/assets/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(entity.id);

      // update
      entity.name = entity.name + '!';
      res = await request(app).patch('/api/v1/assets').send(entity);
      expect(res.statusCode).toEqual(200);
      res = await request(app).get(`/api/v1/assets/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toBe(entity.name);

      // remove
      res = await request(app).delete(`/api/v1/assets/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      res = await request(app).get(`/api/v1/assets/${entity.id}`);
      expect(res.statusCode).toEqual(404);
      res = await request(app).delete(`/api/v1/assets/${entity.id}`);
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('Artifacts', () => {
    it('get', async () => {
      const entity = getRandomItem<ArtifactEntity>(artifacts);
      const res = await request(app).get(`/api/v1/artifacts/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(entity.id);
    });

    it('list', async () => {
      const res = await request(app).get('/api/v1/artifacts');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('add + update + remove', async () => {
      // add
      let entity = mockArtifact();
      let res = await request(app).get(`/api/v1/artifacts/${entity.id}`);
      expect(res.statusCode).toEqual(404);
      res = await request(app).post('/api/v1/artifacts').send(entity);
      expect(res.statusCode).toEqual(201);
      res = await request(app).get(`/api/v1/artifacts/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(entity.id);

      // update
      entity.name = entity.name + '!';
      res = await request(app).patch('/api/v1/artifacts').send(entity);
      expect(res.statusCode).toEqual(200);
      res = await request(app).get(`/api/v1/artifacts/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toBe(entity.name);

      // remove
      res = await request(app).delete(`/api/v1/artifacts/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      res = await request(app).get(`/api/v1/artifacts/${entity.id}`);
      expect(res.statusCode).toEqual(404);
      res = await request(app).delete(`/api/v1/artifacts/${entity.id}`);
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('Gates', () => {
    it('get', async () => {
      const entity = getRandomItem<GateEntity>(gates);
      const res = await request(app).get(`/api/v1/gates/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(entity.id);
    });

    it('list', async () => {
      const res = await request(app).get('/api/v1/gates');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('add + update + remove', async () => {
      // add
      let entity = mockGate();
      let res = await request(app).get(`/api/v1/gates/${entity.id}`);
      expect(res.statusCode).toEqual(404);
      res = await request(app).post('/api/v1/gates').send(entity);
      expect(res.statusCode).toEqual(201);
      res = await request(app).get(`/api/v1/gates/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(entity.id);

      // update
      entity.name = entity.name + '!';
      res = await request(app).patch('/api/v1/gates').send(entity);
      expect(res.statusCode).toEqual(200);
      res = await request(app).get(`/api/v1/gates/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toBe(entity.name);

      // remove
      res = await request(app).delete(`/api/v1/gates/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      res = await request(app).get(`/api/v1/gates/${entity.id}`);
      expect(res.statusCode).toEqual(404);
      res = await request(app).delete(`/api/v1/gates/${entity.id}`);
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('Criteria', () => {
    it('get', async () => {
      const entity = getRandomItem<CriterionEntity>(criteria);
      const res = await request(app).get(`/api/v1/criteria/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(entity.id);
    });

    it('list', async () => {
      const res = await request(app).get('/api/v1/criteria');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('add + update + remove', async () => {
      // add
      let entity = mockGate();
      let res = await request(app).get(`/api/v1/criteria/${entity.id}`);
      expect(res.statusCode).toEqual(404);
      res = await request(app).post('/api/v1/criteria').send(entity);
      expect(res.statusCode).toEqual(201);
      res = await request(app).get(`/api/v1/criteria/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(entity.id);

      // update
      entity.name = entity.name + '!';
      res = await request(app).patch('/api/v1/criteria').send(entity);
      expect(res.statusCode).toEqual(200);
      res = await request(app).get(`/api/v1/criteria/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toBe(entity.name);

      // remove
      res = await request(app).delete(`/api/v1/criteria/${entity.id}`);
      expect(res.statusCode).toEqual(200);
      res = await request(app).get(`/api/v1/criteria/${entity.id}`);
      expect(res.statusCode).toEqual(404);
      res = await request(app).delete(`/api/v1/criteria/${entity.id}`);
      expect(res.statusCode).toEqual(404);
    });
  });
});
