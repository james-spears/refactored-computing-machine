import {
  ArtifactDatabase,
  AssetDatabase,
  CriterionDatabase,
  GateDatabase,
  PermissionDatabase,
  ProjectDatabase,
  TeamDatabase,
  UserDatabase,
} from '@/mocks';

describe('UserDatabase', () => {
  const db = UserDatabase;
  test('should pass', () => {
    expect(db.list().length).toBe(40);
  });
});

describe('TeamDatabase', () => {
  const db = TeamDatabase;
  test('should pass', () => {
    expect(db.list().length).toBe(10);
  });
});

describe('PermissionDatabase', () => {
  const db = PermissionDatabase;
  test('should pass', () => {
    expect(db.list().length).toBe(50);
  });
});

describe('AssetDatabase', () => {
  const db = AssetDatabase;
  test('should pass', () => {
    expect(db.list().length).toBe(30);
  });
});

describe('ArtifactDatabase', () => {
  const db = ArtifactDatabase;
  test('should pass', () => {
    expect(db.list().length).toBe(500);
  });
});

describe('ProjectDatabase', () => {
  const db = ProjectDatabase;
  test('should pass', () => {
    expect(db.list().length).toBe(20);
  });
});

describe('CriterionDatabase', () => {
  const db = CriterionDatabase;
  test('should pass', () => {
    expect(db.list().length).toBe(100);
  });
});

describe('GateDatabase', () => {
  const db = GateDatabase;
  test('should pass', () => {
    expect(db.list().length).toBe(25);
  });
});
