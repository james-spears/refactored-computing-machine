import validators from '@/validators';
import { mockUser, mockProject, mockTeam } from '@/mocks';

describe('UserValidator', () => {
  const validator = validators.user;
  test('should pass', () => {
    expect(validator(mockUser())).toBe(true);
  });
});

describe('TeamValidator', () => {
  const validator = validators.team;
  test('should pass', () => {
    expect(validator(mockTeam())).toBe(true);
  });
});

// describe('PermissionDatabase', () => {
//   const db = PermissionDatabase;
//   test('should pass', () => {
//     expect(db.list().length).toBe(50);
//   });
// });

// describe('AssetDatabase', () => {
//   const db = AssetDatabase;
//   test('should pass', () => {
//     expect(db.list().length).toBe(30);
//   });
// });

// describe('ArtifactDatabase', () => {
//   const db = ArtifactDatabase;
//   test('should pass', () => {
//     expect(db.list().length).toBe(500);
//   });
// });

describe('ProjectValidator', () => {
  const validator = validators.project;
  test('should pass', () => {
    expect(validator(mockProject())).toBe(true);
  });
});

// describe('CriterionDatabase', () => {
//   const db = CriterionDatabase;
//   test('should pass', () => {
//     expect(db.list().length).toBe(100);
//   });
// });

// describe('GateDatabase', () => {
//   const db = GateDatabase;
//   test('should pass', () => {
//     expect(db.list().length).toBe(25);
//   });
// });
