import { IUser } from '../interfaces/IUser';

class UserDto {
  email;
  id;
  verify;

  constructor(model: IUser) {
    this.email = model.email;
    this.id = model._id;
    this.verify = model.verify;
  }
}

export default UserDto;
