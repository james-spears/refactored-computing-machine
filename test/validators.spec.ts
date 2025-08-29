import validators from '@/app/validators';
import {
  mockUser,
  mockProject,
  mockTeam,
  mockPermission,
  mockAsset,
  mockArtifact,
  mockCriterion,
  mockGate,
  mockRelease,
} from '@/app/__mocks__/utils';
jest.mock('@/app/database');

describe('UserValidator', () => {
  const validator = validators.user;
  test('should pass', () => {
    expect(validator(mockUser())).toBe(true);
    expect(validator({ valid: false })).toBe(false);
  });
});

describe('TeamValidator', () => {
  const validator = validators.team;
  test('should pass', () => {
    expect(validator(mockTeam())).toBe(true);
    expect(validator({ valid: false })).toBe(false);
  });
});

describe('PermissionValidator', () => {
  const validator = validators.permission;
  test('should pass', () => {
    expect(validator(mockPermission())).toBe(true);
    expect(validator({ valid: false })).toBe(false);
  });
});

describe('AssetValidator', () => {
  const validator = validators.asset;
  test('should pass', () => {
    expect(validator(mockAsset())).toBe(true);
    expect(validator({ valid: false })).toBe(false);
  });
});

describe('ArtifactValidator', () => {
  const validator = validators.artifact;
  test('should pass', () => {
    expect(validator(mockArtifact())).toBe(true);
    expect(validator({ valid: false })).toBe(false);
  });
});

describe('ProjectValidator', () => {
  const validator = validators.project;
  test('should pass', () => {
    expect(validator(mockProject())).toBe(true);
    expect(validator({ valid: false })).toBe(false);
  });
});

describe('CriterionValidator', () => {
  const validator = validators.criterion;
  test('should pass', () => {
    expect(validator(mockCriterion())).toBe(true);
    expect(validator({ valid: false })).toBe(false);
  });
});

describe('GateValidator', () => {
  const validator = validators.gate;
  test('should pass', () => {
    expect(validator(mockGate())).toBe(true);
    expect(validator({ valid: false })).toBe(false);
  });
});

describe('ReleaseValidator', () => {
  const validator = validators.release;
  test('should pass', () => {
    expect(validator(mockRelease())).toBe(true);
    expect(validator({ valid: false })).toBe(false);
  });
});
