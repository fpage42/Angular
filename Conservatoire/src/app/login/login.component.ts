import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../authentification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authentificationService: AuthentificationService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.authentificationService.user.subscribe(user => {
      if (this.authentificationService.LOGOUT) {
        window.location.href = environment.authentification_application_url + '/logout/' + environment.auth_token;
      } else {
        if (user.uuid === undefined) {
          this.route.queryParams.subscribe(params => {
            if (params.token === undefined || params.token == null) {
              window.location.href = environment.authentification_application_url + '/authorization/' + environment.auth_token;
            } else {
              this.authentificationService.changeRefreshToken(params.token);
            }
          });
        } else {
          this.redirectUser();
        }
      }
    });
  }

  private redirectUser() {
    this.router.navigate(['/admin']);
  }
}
