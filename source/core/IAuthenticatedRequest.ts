import { UserModel } from '../models/user';
import { Request } from 'express';

export interface IAuthenticatedRequest extends Request {
    user: UserModel;
}