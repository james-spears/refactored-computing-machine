import {
  ArtifactModel,
  AssetModel,
  CriterionModel,
  GateModel,
  PermissionModel,
  ProjectModel,
  ReleaseModel,
  TeamModel,
  UserModel,
} from '@/app/models';
import {
  mockArtifact,
  mockAsset,
  mockCriterion,
  mockGate,
  mockPermission,
  mockProject,
  mockRelease,
  mockTeam,
  mockUser,
} from '@/app/__mocks__/utils';
jest.mock('@/app/database');

describe('UserModel', () => {
  const entity = mockUser();
  const instance = new UserModel(entity);
  test('should pass', () => {
    const spy = jest.spyOn(instance, 'toJSON');
    expect(JSON.stringify(instance)).toBe(JSON.stringify(instance.toJSON()));
    expect(spy).toHaveBeenCalled();
  });
});

describe('TeamModel', () => {
  const entity = mockTeam();
  const instance = new TeamModel(entity);
  test('should pass', () => {
    const spy = jest.spyOn(instance, 'toJSON');
    expect(JSON.stringify(instance)).toBe(JSON.stringify(instance.toJSON()));
    expect(spy).toHaveBeenCalled();
  });
});

describe('PermissionModel', () => {
  const entity = mockPermission();
  const instance = new PermissionModel(entity);
  test('should pass', () => {
    const spy = jest.spyOn(instance, 'toJSON');
    expect(JSON.stringify(instance)).toBe(JSON.stringify(instance.toJSON()));
    expect(spy).toHaveBeenCalled();
  });
});

describe('AssetModel', () => {
  const entity = mockAsset();
  const instance = new AssetModel(entity);
  test('should pass', () => {
    const spy = jest.spyOn(instance, 'toJSON');
    expect(JSON.stringify(instance)).toBe(JSON.stringify(instance.toJSON()));
    expect(spy).toHaveBeenCalled();
  });
});

describe('ArtifactModel', () => {
  const entity = mockArtifact();
  const instance = new ArtifactModel(entity);
  test('should pass', () => {
    const spy = jest.spyOn(instance, 'toJSON');
    expect(JSON.stringify(instance)).toBe(JSON.stringify(instance.toJSON()));
    expect(spy).toHaveBeenCalled();
  });
});

describe('ProjectModel', () => {
  const entity = mockProject();
  const instance = new ProjectModel(entity);
  test('should pass', () => {
    const spy = jest.spyOn(instance, 'toJSON');
    expect(JSON.stringify(instance)).toBe(JSON.stringify(instance.toJSON()));
    expect(spy).toHaveBeenCalled();
  });
});

describe('ReleaseModel', () => {
  const entity = mockRelease();
  const instance = new ReleaseModel(entity);
  test('should pass', () => {
    const spy = jest.spyOn(instance, 'toJSON');
    expect(JSON.stringify(instance)).toBe(JSON.stringify(instance.toJSON()));
    expect(spy).toHaveBeenCalled();
  });
});

describe('CriterionModel', () => {
  const entity = mockCriterion();
  const instance = new CriterionModel(entity);
  test('should pass', () => {
    const spy = jest.spyOn(instance, 'toJSON');
    expect(JSON.stringify(instance)).toBe(JSON.stringify(instance.toJSON()));
    expect(spy).toHaveBeenCalled();
  });
});

describe('GateModel', () => {
  const entity = mockGate();
  const instance = new GateModel(entity);
  test('should pass', () => {
    const spy = jest.spyOn(instance, 'toJSON');
    expect(JSON.stringify(instance)).toBe(JSON.stringify(instance.toJSON()));
    expect(spy).toHaveBeenCalled();
  });
});
