import { Request } from 'express';
import { UserInterface } from './user.interface';

export interface AuthenticatedRequest extends Request {
  user: UserInterface;
}
