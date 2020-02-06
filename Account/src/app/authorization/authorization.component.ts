import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../authentification.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  constructor(public authentificationService: AuthentificationService, private route: ActivatedRoute) {}

  ngOnInit() {
    if (this.authentificationService.userIsLog()) {
      this.authentificationService.generateRefreshToken(this.route.snapshot.paramMap.get('clientUuid'), refreshToken => {
        this.authentificationService.getClientRedirectUri(this.route.snapshot.paramMap.get('clientUuid')).subscribe(value => {
          console.log(refreshToken);
          console.log('redirect: ', value.redirectUri + '?token=' + refreshToken);
          window.location.href = value.redirectUri + '?token=' + refreshToken;
        });
      });
    }
  }

}
