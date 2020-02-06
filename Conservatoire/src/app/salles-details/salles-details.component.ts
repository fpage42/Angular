import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {Salle} from '../models/salle';
import {ActivatedRoute} from '@angular/router';
import {UserListService} from '../user-tab/userService/user-list.service';
import {AuthentificationService} from '../authentification.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {SalleService} from '../salle-tab/salle/salle.service';

@Component({
  selector: 'app-salles-details',
  templateUrl: './salles-details.component.html',
  styleUrls: ['./salles-details.component.scss']
})
export class SallesDetailsComponent implements OnInit {

  form;
  user = new User();
  private salleModif: Salle;
  private paramsId: string;

  constructor(private activatedRoute: ActivatedRoute, private salleService: SalleService,
              private authentificationService: AuthentificationService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: new FormControl(''),
      size: new FormControl('')
    });
  }

  onSubmit(datas) {
    this.salleModif.name = datas.name;
    this.salleModif.size = datas.size;
    this.salleService.saveChange(this.salleModif);
  }

  ngOnInit() {
    this.authentificationService.user.subscribe(user => {
      this.user = user;
      this.loadForm();
    });
    this.activatedRoute.params.subscribe(params => {
      this.paramsId = params.id;
      this.salleService.loadRessource(params.id);
    });
    this.salleService.ressources.subscribe(salles => {
      this.salleModif = salles.find(salle => salle.uuid === this.paramsId);
      this.loadForm();
    });
  }

  private loadForm() {
    if (this.salleModif !== undefined) {
      this.form = this.formBuilder.group({
        name: new FormControl({value: this.salleModif.name, disabled: !this.user.userPermissions.includes('salle.modify')}),
        size: new FormControl({value: this.salleModif.size, disabled: !this.user.userPermissions.includes('salle.modify')})
      });
    }
  }

}
