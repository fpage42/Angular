import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthentificationService} from '../authentification.service';

@Component({
  selector: 'app-panel-adm',
  templateUrl: './panel-adm.component.html',
  styleUrls: ['./panel-adm.component.scss']
})

export class PanelAdmComponent implements OnInit {

  public id: string;

  constructor(private authentificationService: AuthentificationService, public router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });
  }

  ngOnInit() {
    this.authentificationService.refreshToken.subscribe(() => this.authentificationService.needLog());
  }

}
