import 'jose'; // Import the actual jose module

jest.mock('jose', () => ({
  // Retain actual implementations for functions you don't want to mock
  // ...jest.genMockFromModule('jose'),

  // Mock specific functions, e.g., jwtVerify
  jwtVerify: jest.fn(() => ({
    payload: { sub: 'test-user', role: 'admin' }, // Mocked payload
    protectedHeader: { alg: 'ES256' },
  })),

  // Mock SignJWT if you're testing token creation
  SignJWT: jest.fn().mockImplementation(() => ({
    setProtectedHeader: jest.fn().mockReturnThis(), // Allow chaining
    sign: jest.fn().mockResolvedValue('mocked-jwt-token'), // Return a mocked token
  })),
}));
