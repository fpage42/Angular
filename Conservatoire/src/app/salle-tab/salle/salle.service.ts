import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {AServiceRessource} from '../../abstract/a-service-ressource';
import {Salle} from '../../models/salle';

@Injectable({
  providedIn: 'root'
})
export class SalleService extends AServiceRessource<Salle> {

  protected urlCreate(): string {
    return environment.time_management_api_url + '/salles';
  }

  protected urlLoadList(): string {
    return environment.time_management_api_url + '/salles/all';
  }

  protected urlSave() {
    console.error('Salle.service urlSave not implemented yet.');
    return '';
  }

  createRessource(salle: Salle) {
    super.createRessource({name: salle.name, size: salle.size});
  }

  protected urlLoadRessource(): string {
    return environment.time_management_api_url + '/salles?uuid=';
  }

  public saveChange(salle: Salle) {
    this.saveChange(salle);
  }
}
