import {Injectable} from '@angular/core';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {User} from './models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../environments/environment';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {

  private REFRESHTOKENCOOKIENAME = 'conservatoireRefreshToken';

  private USER = new BehaviorSubject<User>(new User());
  private REFRESHTOKEN = new BehaviorSubject<string>(this.cookieService.get(this.REFRESHTOKENCOOKIENAME));
  public LOGOUT = false;

  constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router) {
    this.REFRESHTOKEN.subscribe(refreshToken => {
      if (refreshToken !== '') {
        this.getUserToken().toPromise().then(token => this.loadUser(token));
      }
    });
  }

  public getUserToken() {
    return this.httpClient.get(environment.authentification_api_url + '/tokens/user?refreshToken=' + this.REFRESHTOKEN.value, {
      headers : new HttpHeaders({
        authorization: environment.auth_token
      }),
      responseType: 'text'
    }).pipe(catchError(() => {
        this.changeRefreshToken('');
        return EMPTY;
    }));
  }

  public changeRefreshToken(token: string) {
    if (token === '' || token === undefined) {
      this.cookieService.delete(this.REFRESHTOKENCOOKIENAME);
      this.REFRESHTOKEN.next('');
    } else {
      this.cookieService.set(this.REFRESHTOKENCOOKIENAME, token, 365, '/');
      this.REFRESHTOKEN.next(token);
    }
  }

  private loadUser(token: string) {
    this.httpClient.get<User>(environment.conservatoire_user_api_url + '/user/self', {
      headers: new HttpHeaders({
        authorization: token
      })
    }).toPromise().then(user => {
      this.USER.next(user);
    });
  }

  needLog() {
    this.refreshToken.subscribe(token => {
      if (token === '') {
        this.router.navigate(['/login']);
      }
    });
  }

  logout() {
    this.LOGOUT = true;
    this.REFRESHTOKEN.next('');
    this.USER.next(new User());
  }

  get user(): BehaviorSubject<User> {
    return this.USER;
  }

  get refreshToken(): BehaviorSubject<string> {
    return this.REFRESHTOKEN;
  }
}
