import {
  ArtifactEntity,
  AssetEntity,
  CriterionEntity,
  Entity,
  GateEntity,
  PermissionEntity,
  ProjectEntity,
  TeamEntity,
  UserEntity,
  ReleaseEntity,
} from '@/app/entities';
import { Repository } from '@/app/repositories';
import { MongoClient, ServerApiVersion, Collection } from 'mongodb';

// Replace the placeholder with your Atlas connection string
// if (!process.env.MONGODB_CONNECTION_URI) throw new Error('mongodb connection uri unset');
const uri = process.env.MONGODB_CONNECTION_URI || 'mongodb://user:pass@localhost:27017/';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

await client.connect();

export class Database<T extends Entity> implements Repository<T> {
  collection: Collection;
  constructor(collection: Collection) {
    this.collection = collection;
  }

  async add(entity: T): Promise<string> {
    const res = await this.collection.insertOne(entity);
    return res.insertedId.toString();
  }

  async get(id: string): Promise<T | undefined> {
    const doc = await this.collection.findOne<T>({ id });
    if (doc) {
      return doc;
    }
  }

  async remove(id: string): Promise<boolean> {
    const res = await this.collection.deleteOne({ id });
    return res.acknowledged;
  }

  async update(entity: Partial<T> & Pick<T, 'id'>): Promise<string | undefined> {
    const { id, ...update } = entity;
    const res = await this.collection.updateOne({ id }, [update]);
    return res.upsertedId?.toString();
  }

  async list(): Promise<T[]> {
    const cursor = this.collection.find<T>({});
    return cursor.toArray();
  }
}

export const UserDatabase = new Database<UserEntity>(
  client.db('app').collection('users')
);
export const TeamDatabase = new Database<TeamEntity>(
  client.db('app').collection('teams')
);
export const PermissionDatabase = new Database<PermissionEntity>(
  client.db('app').collection('permissions')
);
export const AssetDatabase = new Database<AssetEntity>(
  client.db('app').collection('assets')
);
export const ArtifactDatabase = new Database<ArtifactEntity>(
  client.db('app').collection('artifacts')
);
export const ProjectDatabase = new Database<ProjectEntity>(
  client.db('app').collection('projects')
);
export const CriterionDatabase = new Database<CriterionEntity>(
  client.db('app').collection('criteria')
);
export const GateDatabase = new Database<GateEntity>(
  client.db('app').collection('gates')
);
export const ReleaseDatabase = new Database<ReleaseEntity>(
  client.db('app').collection('releases')
);
