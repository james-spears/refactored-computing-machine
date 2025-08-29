// src/@types/express/index.d.ts
import { JWTPayload } from 'jose';

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload; // Make it optional if it might not always be present
    }
  }
}
