import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {User} from './user/user.module';
import {catchError} from 'rxjs/operators';
import {environment} from '../environments/environment';

export interface Response {
  message: string;
  uuid: string;
}

export interface ClientInformationResponse {
  redirectUri: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {

  private REFRESHTOKEN = new BehaviorSubject<string>('');
  private user: User;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
    this.REFRESHTOKEN.next(this.cookieService.get('accountRefreshToken'));
    console.log('chargement des cookies: ', this.cookieService.getAll());
    // this.getUserToken().toPromise().then();
  }

  public getUserToken() {
    console.log('getUserToken: refreshToken=', this.REFRESHTOKEN.value);
    return this.httpClient.get(environment.authentification_api_url + '/tokens/user?refreshToken=' + this.REFRESHTOKEN.value, {
      headers : new HttpHeaders({
        authorization: environment.auth_token,
      }),
      responseType: 'text'
    }).pipe(catchError(err => {
        console.log('loadUserTokenErr:' , err);
        this.changeRefreshToken('');
        console.log('erreur de chargement du user token');
        return EMPTY;
    }));
  }

  public registerUser(subscription): Observable<Response> {
    return this.httpClient.post<Response>(environment.authentification_api_url + '/users/create', {
      email: subscription.email.value,
      username: subscription.username.value,
      password: subscription.password.value
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: environment.auth_token
      })
    });
  }

  connectUser(log) {
    return this.httpClient.post<Response>(environment.authentification_api_url + '/users/connect', {
      username: log.username.value,
      password: log.password.value
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: environment.auth_token
      })
    });
  }

  changeRefreshToken(newToken: string) {
    this.REFRESHTOKEN.next(newToken);
    if (newToken === '') {
      console.log('delete the token');
      this.cookieService.delete('accountRefreshToken', '/');
    } else {
      this.cookieService.set('accountRefreshToken', this.REFRESHTOKEN.value, 365, '/');
    }
  }

  logout() {
    this.changeRefreshToken('');
  }

  loadUser() {
    this.httpClient.get(environment.authentification_api_url + '/tokens/user?refreshToken=' + this.REFRESHTOKEN, {
      headers : new HttpHeaders({
        authorization: environment.auth_token
      }),
      responseType: 'text'
    }).subscribe(value => {
      this.httpClient.get<User>(environment.authentification_api_url + '/users?userToken=' + value, {
        headers : new HttpHeaders({
          authorization: environment.auth_token
        })
      }).subscribe(value1 => {
        this.user = value1;
      } );
    },
      () => {
      this.cookieService.delete('accountRefreshToken');
      });
  }

  userIsLog() {
    return this.REFRESHTOKEN.value !== '';
  }

  public get refreshToken(): Observable<string> {
    return this.REFRESHTOKEN.asObservable();
  }

  generateRefreshToken(clientUuid: string, callback) {
    this.getUserToken().subscribe(value => {
      this.httpClient.get(environment.authentification_api_url + '/tokens/refresh?clientId=' +
        clientUuid + '&userTokenId=' + value, {
        headers: new HttpHeaders({
          authorization: this.REFRESHTOKEN.value
        }),
        responseType: 'text'
      }).subscribe(value1 => callback(value1));
    });
  }

  getClientRedirectUri(clientUuid: string) {
    return this.httpClient.get<ClientInformationResponse>(environment.authentification_api_url + '/clients?clientId=' + clientUuid, {
      headers: new HttpHeaders({
        authorization: environment.auth_token
      })});
    }
}
