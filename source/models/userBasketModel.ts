import { IProduct } from './interfaces/IProduct';
import { UserModel } from './user';

export class UserBasketModel {
	// Decorate user model

	public user: UserModel;
	public basket: IProduct[];
}
