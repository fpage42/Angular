import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthentificationService} from '../authentification.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private authentificationService: AuthentificationService,
              private router: Router) { }

  ngOnInit() {
    this.authentificationService.logout();
    this.activatedRoute.params.subscribe(params => {
      this.router.navigate(['/authorization/' + params.clientUuid]);
    });
  }

}
