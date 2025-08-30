export const jwtVerify = jest.fn((token) => ({
  payload: {
    sub: 'test-user',
    role: 'admin',
    email: 'unit-test@example.com',
    type: token === 'mocked_jwt_token_refresh' ? 'refresh' : 'access',
  }, // Mocked payload
  protectedHeader: { alg: 'ES256' },
}));

// Mock SignJWT if you're testing token creation
export const SignJWT = jest.fn().mockImplementation(() => ({
  // Mock the methods of SignJWT that are used in your code
  setProtectedHeader: jest.fn().mockReturnThis(), // Allow chaining
  setIssuedAt: jest.fn().mockReturnThis(),
  setIssuer: jest.fn().mockReturnThis(),
  setAudience: jest.fn().mockReturnThis(),
  setExpirationTime: jest.fn().mockReturnThis(),
  sign: jest.fn().mockResolvedValue('mocked_jwt_token'), // Return a mocked token
}));

// jest.mock('jose', () => ({
//   // Retain actual implementations for functions you don't want to mock
//   // ...jest.genMockFromModule('jose'),
//   __esModule: true,
//   // Mock specific functions, e.g., jwtVerify
//   jwtVerify: jest.fn(() => ({
//     payload: { sub: 'test-user', role: 'admin' }, // Mocked payload
//     protectedHeader: { alg: 'ES256' },
//   })),

//   // Mock SignJWT if you're testing token creation
//   SignJWT: jest.fn().mockImplementation(() => ({
//     // Mock the methods of SignJWT that are used in your code
//     setProtectedHeader: jest.fn().mockReturnThis(), // Allow chaining
//     setIssuedAt: jest.fn().mockReturnThis(),
//     setIssuer: jest.fn().mockReturnThis(),
//     setAudience: jest.fn().mockReturnThis(),
//     setExpirationTime: jest.fn().mockReturnThis(),
//     sign: jest.fn().mockResolvedValue('mocked_jwt_token'), // Return a mocked token
//   })),
// }));
