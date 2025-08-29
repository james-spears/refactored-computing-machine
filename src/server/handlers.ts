import { Entity, UserEntity } from '@/app/entities';
import { Repository } from '@/app/repositories';
import { Request, Response } from 'express';
import {
  UserDatabase,
  TeamDatabase,
  PermissionDatabase,
  AssetDatabase,
  ArtifactDatabase,
  ProjectDatabase,
  CriterionDatabase,
  GateDatabase,
  ReleaseDatabase,
} from '@/app/database';
import {
  generateTokens,
  validateEmail,
  validatePasswordStrength,
  verifyToken,
} from '@/server/auth';
import bcrypt from 'bcryptjs';

export enum ErrorMessage {
  NOT_FOUND = 'not found',
  SERVER_ERROR = 'server error',
}

/* 
  Auth 
    AUTH_REGISTER = '/auth/register',
    AUTH_LOGIN = '/auth/login',
    AUTH_REFRESH = '/auth/refresh',
    AUTH_GET_PROFILE = '/auth/profile',
    AUTH_UPDATE_PROFILE = '/auth/profile',
    AUTH_LOGOUT = '/auth/profile',
*/
function registerUser<T extends Entity>(repository: Repository<T>) {
  return async (req: Request, res: Response) => {
    try {
      const { email, password /*, name */} = req.body;

      // Validate required fields
      if (!email || !password /*|| !name*/) {
        res.status(400).json({
          error: 'Email, and password are required',
        });
        return;
      }

      // Validate email format
      if (!validateEmail(email)) {
        res.status(400).json({
          error: 'Invalid email format',
        });
        return;
      }

      // Check if user already exists
      if (await repository.get({ email: email.toLowerCase() })) {
        res.status(409).json({
          error: 'User already exists with this email',
        });
        return;
      }

      // Validate password strength
      const passwordValidation = validatePasswordStrength(password);
      if (!passwordValidation.isValid) {
        res.status(400).json({
          error: 'Password does not meet security requirements',
          details: passwordValidation.errors,
        });
        return;
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user
      const userId = crypto.randomUUID();
      const user = {
        id: userId,
        email: email.toLowerCase(),
        // name: name.trim(),
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        isActive: true,
      };

      // users.set(email.toLowerCase(), user);

      // Generate tokens
      const tokens = await generateTokens(userId, email.toLowerCase());

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user.id,
          email: user.email,
          // name: user.name,
          createdAt: user.createdAt,
        },
        tokens,
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

function loginUser(repository: Repository<UserEntity>) {
  return async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          error: 'Email and password are required',
        });
        return;
      }

      // Find user
      const user = await repository.get(email.toLowerCase());
      if (!user /*|| !user.isActive*/) {
        res.status(401).json({
          error: 'Invalid credentials',
        });
        return;
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        res.status(401).json({
          error: 'Invalid credentials',
        });
        return;
      }

      // Generate tokens
      const tokens = await generateTokens(user.id, user.email);

      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          // name: user.name
        },
        tokens,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

function refreshToken(repository: Repository<UserEntity>) {
  return async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({ error: 'Refresh token required' });
        return;
      }

      const payload = await verifyToken(refreshToken);

      if (payload.type !== 'refresh') {
        res.status(401).json({ error: 'Invalid token type' });
        return;
      }

      // // Verify user still exists and is active
      // const user = users.get(payload.email);
      // if (!user || !user.isActive) {
      //   return res.status(401).json({ error: 'User not found or inactive' });
      // }

      // Generate new tokens
      const tokens = await generateTokens(payload.sub!, payload.email as string);

      res.json({
        message: 'Tokens refreshed successfully',
        tokens,
      });
    } catch (error) {
      console.error('Token refresh error:', error);
      res.status(401).json({ error: 'Invalid or expired refresh token' });
    }
  };
}

function getUserProfile(repository: Repository<UserEntity>) {
  return async (req: Request, res: Response) => {
    try {
      const user = await repository.get({ email: req.user!.email + '' });

      if (!user /*|| !user.isActive*/) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({
        user: {
          id: user.id,
          email: user.email,
          // name: user.name,
          // createdAt: user.createdAt,
        },
      });
    } catch (error) {
      console.error('Profile error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

function updateUserProfile(repository: Repository<UserEntity>) {
  return async (req: Request, res: Response) => {
    try {
      const { name, currentPassword, newPassword } = req.body;
      const user = await repository.get({ email: req.user!.email + '' });

      if (!user /*|| !user.isActive*/) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      // // Update name if provided
      // if (name && name.trim()) {
      //   user.name = name.trim();
      // }

      // Update password if provided
      if (newPassword) {
        if (!currentPassword) {
          res.status(400).json({
            error: 'Current password required to change password',
          });
          return;
        }

        const isValidCurrentPassword = await bcrypt.compare(
          currentPassword,
          user.password
        );
        if (!isValidCurrentPassword) {
          res.status(400).json({ error: 'Invalid current password' });
          return;
        }

        const passwordValidation = validatePasswordStrength(newPassword);
        if (!passwordValidation.isValid) {
          res.status(400).json({
            error: 'New password does not meet security requirements',
            details: passwordValidation.errors,
          });
          return;
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
      }

      // user.updatedAt = new Date().toISOString();
      // users.set(req.user.email, user);

      res.json({
        message: 'Profile updated successfully',
        user: {
          id: user.id,
          email: user.email,
          // name: user.name,
          // updatedAt: user.updatedAt,
        },
      });
    } catch (error) {
      console.error('Profile update error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

function logoutUser(repository: Repository<UserEntity>) {
  return async (req: Request, res: Response) => {
    // In a production environment, you would typically:
    // 1. Add the token to a blacklist
    // 2. Store blacklisted tokens in Redis or database
    // 3. Check blacklist in the authenticateToken middleware
    res.json({ message: 'Logged out successfully' });
  };
}

export const authRegister = registerUser(UserDatabase);
export const authLogin = loginUser(UserDatabase);
export const authRefresh = refreshToken(UserDatabase);
export const authGetProfile = getUserProfile(UserDatabase);
export const authUpdateProfile = updateUserProfile(UserDatabase);
export const authLogout = logoutUser(UserDatabase);

function getEntity<T extends Entity>(repository: Repository<T>) {
  return async (req: Request, res: Response) => {
    const entity = await repository.get({ id: req.params.id });
    if (!entity) {
      res.status(404);
      res.json({ error: ErrorMessage.NOT_FOUND });
    } else {
      res.json(entity);
    }
  };
}

function listEntities<T extends Entity>(repository: Repository<T>) {
  return async (req: Request, res: Response) => {
    res.json(await repository.list());
  };
}

function addEntity<T extends Entity>(repository: Repository<T>) {
  return async (req: Request, res: Response) => {
    const _id = await repository.add(req.body);
    if (_id) {
      res.status(201);
      res.json({ _id });
    } else {
      res.status(500);
      res.json({ error: ErrorMessage.SERVER_ERROR });
    }
  };
}

function removeEntity<T extends Entity>(repository: Repository<T>) {
  return async (req: Request, res: Response) => {
    const removed = await repository.remove(req.params.id);
    if (removed) {
      res.json({ removed });
    } else {
      res.status(404);
      res.json({ error: ErrorMessage.NOT_FOUND });
    }
    res.end();
  };
}

function updateEntity<T extends Entity>(repository: Repository<T>) {
  return async (req: Request, res: Response) => {
    const _id = await repository.update(req.body);
    if (_id) {
      res.json({ _id });
    } else {
      res.status(500);
      res.json({ error: ErrorMessage.SERVER_ERROR });
    }
  };
}

/* 
  Users 
*/
export const getUser = getEntity(UserDatabase);
export const listUsers = listEntities(UserDatabase);
export const addUser = addEntity(UserDatabase);
export const removeUser = removeEntity(UserDatabase);
export const updateUser = updateEntity(UserDatabase);

/* 
  Teams 
*/
export const getTeam = getEntity(TeamDatabase);
export const listTeams = listEntities(TeamDatabase);
export const addTeam = addEntity(TeamDatabase);
export const removeTeam = removeEntity(TeamDatabase);
export const updateTeam = updateEntity(TeamDatabase);

/* 
  Permissions 
*/
export const getPermission = getEntity(PermissionDatabase);
export const listPermissions = listEntities(PermissionDatabase);
export const addPermission = addEntity(PermissionDatabase);
export const removePermission = removeEntity(PermissionDatabase);
export const updatePermission = updateEntity(PermissionDatabase);

/* 
  Releases 
*/
export const getRelease = getEntity(ReleaseDatabase);
export const listReleases = listEntities(ReleaseDatabase);
export const addRelease = addEntity(ReleaseDatabase);
export const removeRelease = removeEntity(ReleaseDatabase);
export const updateRelease = updateEntity(ReleaseDatabase);

/* 
  Projects 
*/
export const getProject = getEntity(ProjectDatabase);
export const listProjects = listEntities(ProjectDatabase);
export const addProject = addEntity(ProjectDatabase);
export const removeProject = removeEntity(ProjectDatabase);
export const updateProject = updateEntity(ProjectDatabase);

/* 
  Gates 
*/
export const getGate = getEntity(GateDatabase);
export const listGates = listEntities(GateDatabase);
export const addGate = addEntity(GateDatabase);
export const removeGate = removeEntity(GateDatabase);
export const updateGate = updateEntity(GateDatabase);

/* 
  Conditions 
*/
export const getCriterion = getEntity(CriterionDatabase);
export const listCriteria = listEntities(CriterionDatabase);
export const addCriterion = addEntity(CriterionDatabase);
export const removeCriterion = removeEntity(CriterionDatabase);
export const updateCriterion = updateEntity(CriterionDatabase);

/* 
  Assets 
*/
export const getAsset = getEntity(AssetDatabase);
export const listAssets = listEntities(AssetDatabase);
export const addAsset = addEntity(AssetDatabase);
export const removeAsset = removeEntity(AssetDatabase);
export const updateAsset = updateEntity(AssetDatabase);

/* 
  Artifacts 
*/
export const getArtifact = getEntity(ArtifactDatabase);
export const listArtifacts = listEntities(ArtifactDatabase);
export const addArtifact = addEntity(ArtifactDatabase);
export const removeArtifact = removeEntity(ArtifactDatabase);
export const updateArtifact = updateEntity(ArtifactDatabase);
