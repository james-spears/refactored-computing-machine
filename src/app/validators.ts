import schema from '@/app/schema.json' with { type: 'json' };

import Ajv from 'ajv';

const ajv = new Ajv();

ajv.addSchema(schema);

const user = ajv.getSchema('#/definitions/UserEntity');
if (!user) throw new Error('user validator is not defined');

const team = ajv.getSchema('#/definitions/TeamEntity');
if (!team) throw new Error('team validator is not defined');

const permission = ajv.getSchema('#/definitions/PermissionEntity');
if (!permission) throw new Error('permission validator is not defined');

const project = ajv.getSchema('#/definitions/ProjectEntity');
if (!project) throw new Error('project validator is not defined');

const asset = ajv.getSchema('#/definitions/AssetEntity');
if (!asset) throw new Error('asset validator is not defined');

const artifact = ajv.getSchema('#/definitions/ArtifactEntity');
if (!artifact) throw new Error('artifact validator is not defined');

const criterion = ajv.getSchema('#/definitions/CriterionEntity');
if (!criterion) throw new Error('criterion validator is not defined');

const gate = ajv.getSchema('#/definitions/GateEntity');
if (!gate) throw new Error('gate validator is not defined');

const release = ajv.getSchema('#/definitions/ReleaseEntity');
if (!release) throw new Error('release validator is not defined');

export default {
  user,
  team,
  permission,
  project,
  asset,
  artifact,
  criterion,
  gate,
  release,
};
