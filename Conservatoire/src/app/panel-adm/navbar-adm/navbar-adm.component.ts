import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../authentification.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-navbar-adm',
  templateUrl: './navbar-adm.component.html',
  styleUrls: ['./navbar-adm.component.scss']
})
export class NavbarAdmComponent implements OnInit {

  constructor(public authentificationService: AuthentificationService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authentificationService.logout();
//    window.location.href = environment.authentification_application_url + '/logout/' + environment.auth_token;
  }
}
