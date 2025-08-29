import express, { Request, Response, NextFunction } from 'express';
import * as handlers from '@/server/handlers';
import { authLimiter } from './auth';
const router = express.Router();

// middleware that is specific to this router
// const timeLog = (req: Request, res: Response, next: NextFunction) => {
//   console.log('Time: ', Date.now());
//   next();
// };
// router.use(timeLog);

export enum Route {
  AUTH_REGISTER = '/auth/register',
  AUTH_LOGIN = '/auth/login',
  AUTH_REFRESH = '/auth/refresh',
  AUTH_GET_PROFILE = '/auth/profile',
  AUTH_UPDATE_PROFILE = '/auth/profile',
  AUTH_LOGOUT = '/auth/profile',

  GET_USER = '/users/:id',
  LIST_USERS = '/users',
  ADD_USER = '/users',
  REMOVE_USER = '/users/:id',
  UPDATE_USER = '/users',

  GET_TEAM = '/teams/:id',
  LIST_TEAMS = '/teams',
  ADD_TEAM = '/teams',
  REMOVE_TEAM = '/teams/:id',
  UPDATE_TEAM = '/teams',

  GET_PERMISSION = '/permissions/:id',
  LIST_PERMISSIONS = '/permissions',
  ADD_PERMISSION = '/permissions',
  REMOVE_PERMISSION = '/permissions/:id',
  UPDATE_PERMISSION = '/permissions',

  GET_RELEASE = '/releases/:id',
  LIST_RELEASES = '/releases',
  ADD_RELEASE = '/releases',
  REMOVE_RELEASE = '/releases/:id',
  UPDATE_RELEASE = '/releases',

  GET_PROJECT = '/projects/:id',
  LIST_PROJECTS = '/projects',
  ADD_PROJECT = '/projects',
  REMOVE_PROJECT = '/projects/:id',
  UPDATE_PROJECT = '/projects',

  GET_ASSET = '/assets/:id',
  LIST_ASSETS = '/assets',
  ADD_ASSET = '/assets',
  REMOVE_ASSET = '/assets/:id',
  UPDATE_ASSET = '/assets',

  GET_ARTIFACT = '/artifacts/:id',
  LIST_ARTIFACTS = '/artifacts',
  ADD_ARTIFACT = '/artifacts',
  REMOVE_ARTIFACT = '/artifacts/:id',
  UPDATE_ARTIFACT = '/artifacts',

  GET_GATE = '/gates/:id',
  LIST_GATES = '/gates',
  ADD_GATE = '/gates',
  REMOVE_GATE = '/gates/:id',
  UPDATE_GATE = '/gates',

  GET_CRITERION = '/criteria/:id',
  LIST_CRITERIA = '/criteria',
  ADD_CRITERION = '/criteria',
  REMOVE_CRITERION = '/criteria/:id',
  UPDATE_CRITERION = '/criteria',
}

// AUTH
router.post(Route.AUTH_REGISTER, authLimiter, handlers.authRegister);
router.post(Route.AUTH_LOGIN, handlers.authLogin);
router.post(Route.AUTH_REFRESH, handlers.authRefresh);
router.get(Route.AUTH_GET_PROFILE, handlers.authGetProfile);
router.put(Route.AUTH_UPDATE_PROFILE, handlers.authUpdateProfile);
router.get(Route.AUTH_LOGOUT, handlers.authLogout);

// USER
router.get(Route.GET_USER, handlers.getUser);
router.get(Route.LIST_USERS, handlers.listUsers);
router.post(Route.ADD_USER, handlers.addUser);
router.delete(Route.REMOVE_USER, handlers.removeUser);
router.patch(Route.UPDATE_USER, handlers.updateUser);

// TEAM
router.get(Route.GET_TEAM, handlers.getTeam);
router.get(Route.LIST_TEAMS, handlers.listTeams);
router.post(Route.ADD_TEAM, handlers.addTeam);
router.delete(Route.REMOVE_TEAM, handlers.removeTeam);
router.patch(Route.UPDATE_TEAM, handlers.updateTeam);

// PERMISSION
router.get(Route.GET_PERMISSION, handlers.getPermission);
router.get(Route.LIST_PERMISSIONS, handlers.listPermissions);
router.post(Route.ADD_PERMISSION, handlers.addPermission);
router.delete(Route.REMOVE_PERMISSION, handlers.removePermission);
router.patch(Route.UPDATE_PERMISSION, handlers.updatePermission);

// RELEASE
router.get(Route.GET_RELEASE, handlers.getRelease);
router.get(Route.LIST_RELEASES, handlers.listReleases);
router.post(Route.ADD_RELEASE, handlers.addRelease);
router.delete(Route.REMOVE_RELEASE, handlers.removeRelease);
router.patch(Route.UPDATE_RELEASE, handlers.updateRelease);

// PROJECT
router.get(Route.GET_PROJECT, handlers.getProject);
router.get(Route.LIST_PROJECTS, handlers.listProjects);
router.post(Route.ADD_PROJECT, handlers.addProject);
router.delete(Route.REMOVE_PROJECT, handlers.removeProject);
router.patch(Route.UPDATE_PROJECT, handlers.updateProject);

// ARTIFACT
router.get(Route.GET_ARTIFACT, handlers.getArtifact);
router.get(Route.LIST_ARTIFACTS, handlers.listArtifacts);
router.post(Route.ADD_ARTIFACT, handlers.addArtifact);
router.delete(Route.REMOVE_ARTIFACT, handlers.removeArtifact);
router.patch(Route.UPDATE_ARTIFACT, handlers.updateArtifact);

// ASSET
router.get(Route.GET_ASSET, handlers.getAsset);
router.get(Route.LIST_ASSETS, handlers.listAssets);
router.post(Route.ADD_ASSET, handlers.addAsset);
router.delete(Route.REMOVE_ASSET, handlers.removeAsset);
router.patch(Route.UPDATE_ASSET, handlers.updateAsset);

// PROJECT
router.get(Route.GET_PROJECT, handlers.getProject);
router.get(Route.LIST_PROJECTS, handlers.listProjects);
router.post(Route.ADD_PROJECT, handlers.addProject);
router.delete(Route.REMOVE_PROJECT, handlers.removeProject);
router.patch(Route.UPDATE_PROJECT, handlers.updateProject);

// GATE
router.get(Route.GET_GATE, handlers.getGate);
router.get(Route.LIST_GATES, handlers.listGates);
router.post(Route.ADD_GATE, handlers.addGate);
router.delete(Route.REMOVE_GATE, handlers.removeGate);
router.patch(Route.UPDATE_GATE, handlers.updateGate);

// CRITERION
router.get(Route.GET_CRITERION, handlers.getCriterion);
router.get(Route.LIST_CRITERIA, handlers.listCriteria);
router.post(Route.ADD_CRITERION, handlers.addCriterion);
router.delete(Route.REMOVE_CRITERION, handlers.removeCriterion);
router.patch(Route.UPDATE_CRITERION, handlers.updateCriterion);

export default router;
