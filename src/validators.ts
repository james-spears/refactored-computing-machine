import schema from '@/schema.json' with { type: 'json' };

import Ajv from 'ajv';

const ajv = new Ajv();

ajv.addSchema(schema);

const user = ajv.getSchema('#/definitions/UserEntity');
if (!user) throw new Error('user validator is not defined');

const team = ajv.getSchema('#/definitions/TeamEntity');
if (!team) throw new Error('team validator is not defined');

const project = ajv.getSchema('#/definitions/ProjectEntity');
if (!project) throw new Error('project validator is not defined');

export default {
  user,
  team,
  project,
};
