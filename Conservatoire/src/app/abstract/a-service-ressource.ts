import {BehaviorSubject, Observable} from 'rxjs';
import {AuthentificationService} from '../authentification.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AIdentifiable} from './aidentifiable';

export abstract class AServiceRessource<T extends AIdentifiable> {

  protected _ressources = new BehaviorSubject<T[]>([]);

  constructor(protected authentificationService: AuthentificationService, protected httpClient: HttpClient) {
  }

  protected abstract urlLoadList(): string;
  protected abstract urlCreate(): string;
  protected abstract urlLoadRessource(): string;
  protected abstract urlSave();

  get ressources(): Observable<T[]> {
    return this._ressources.asObservable();
  }

  public loadRessourcesList() {
    this.authentificationService.getUserToken().subscribe(token => {
      this.httpClient.get<T[]>(this.urlLoadList(), {
        headers: new HttpHeaders({
          authorization: token
        })
      }).subscribe(ressources => {
        const s = this._ressources.value;
        ressources.forEach(value => {
          s[s.findIndex(elem => elem.uuid === value.uuid)] = value;
        });
        this._ressources.next(ressources);
      });
    });
  }

  public loadRessource(ressourceUuid: string) {
    this.authentificationService.getUserToken().subscribe( token => {
      this.httpClient.get<T>(this.urlLoadRessource() + ressourceUuid, {
        headers: new HttpHeaders({
          authorization: token
        })
      }).subscribe(ressources => {
        const s = this._ressources.value;
        if (s == null) {
          this.loadRessourcesList();
        } else {
          const index = s.findIndex(find => find.uuid === ressources.uuid);
          if (index === -1) {
            s.push(ressources);
          } else {
            s[index] = ressources;
          }
          this._ressources.next(s);
        }
      });
    });
  }

  protected createRessource(ressource: any) {
    this.authentificationService.getUserToken().subscribe(token => {
      this.httpClient.put<T>(this.urlCreate(), ressource, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          authorization: token
        })
      }).subscribe(ressources => {
        const s = this._ressources.value;
        s.push(ressources);
        this._ressources.next(s);
      });
    });
  }

  protected saveChange(ressource: any) {
    this.authentificationService.getUserToken().subscribe(token => {
      this.httpClient.post<T>(this.urlSave() + ressource.uuid, ressource, {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          authorization: token
        })
      }).subscribe();
    });
  }
}

