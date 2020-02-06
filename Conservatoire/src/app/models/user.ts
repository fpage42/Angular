import {AIdentifiable} from '../abstract/aidentifiable';

export class User extends AIdentifiable {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  userPermissions = [];
}
