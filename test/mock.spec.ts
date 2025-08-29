import {
  ArtifactDatabase,
  AssetDatabase,
  CriterionDatabase,
  GateDatabase,
  PermissionDatabase,
  ProjectDatabase,
  TeamDatabase,
  UserDatabase,
} from '@/app/database';
jest.mock('@/app/database');

describe('UserDatabase', () => {
  test('should pass', async () => {
    const db = await UserDatabase;
    expect((await db.list()).length).toBe(40);
  });
});

describe('TeamDatabase', () => {
  test('should pass', async () => {
    const db = await TeamDatabase;
    expect((await db.list()).length).toBe(10);
  });
});

describe('PermissionDatabase', () => {
  test('should pass', async () => {
  
  const db = await PermissionDatabase;  expect((await db.list()).length).toBe(50);
  });
});

describe('AssetDatabase', () => {
  test('should pass', async () => {

const db = await AssetDatabase;    expect((await db.list()).length).toBe(30);
  });
});

describe('ArtifactDatabase', () => {
  test('should pass', async () => {
  
  const db = await ArtifactDatabase;  expect((await db.list()).length).toBe(500);
  });
});

describe('ProjectDatabase', () => {
  test('should pass', async () => {
  
  const db = await ProjectDatabase;  expect((await db.list()).length).toBe(20);
  });
});

describe('CriterionDatabase', () => {
  test('should pass', async () => {
  
  const db = await CriterionDatabase;  expect((await db.list()).length).toBe(100);
  });
});

describe('GateDatabase', () => {
  test('should pass', async () => {
    const db = await GateDatabase;
    expect((await db.list()).length).toBe(25);
  });
});
