import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {AServiceRessource} from '../../abstract/a-service-ressource';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserListService extends AServiceRessource<User> {

  loadRessourcesList() {
    super.loadRessourcesList();
  }

  protected createRessource() {
    console.error('UserListService.createResource not implemented yet');
  }

  protected urlCreate(): string {
    return '';
  }

  protected urlLoadList(): string {
    return environment.conservatoire_user_api_url + '/users';
  }

  public urlLoadRessource(): string {
    return environment.conservatoire_user_api_url + '/user/other?userUuid=';
  }

  protected urlSave() {
    return environment.conservatoire_user_api_url + '/user/datas/other?userUuid=';
  }

  loadRessource(userUuid: string) {
    super.loadRessource(userUuid);
  }

  saveChange(user: User) {
    super.saveChange({uuid: user.uuid, firstName: user.firstName, lastName: user.lastName, email: user.email});
  }
}
