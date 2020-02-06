import {Injectable} from '@angular/core';
import {AServiceRessource} from '../../abstract/a-service-ressource';
import {GroupModule} from './group.module';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends AServiceRessource<GroupModule> {

  protected urlCreate(): string {
    return environment.authentification_api_url + '/group';
  }

  protected urlLoadList(): string {
    return environment.authentification_api_url + '/groups';
  }

  protected urlSave() {
    console.error('group.service urlSave not implemented yet.');
    return '';
  }

  createRessource(group: GroupModule) {
    super.createRessource({name: group.name});
  }

  protected urlLoadRessource(): string {
    return '';
  }
}
