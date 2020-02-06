import {AIdentifiable} from './aidentifiable';
import {OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SalleService} from '../salle-tab/salle/salle.service';
import {AuthentificationService} from '../authentification.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {User} from '../models/user';
import {Salle} from '../models/salle';

export abstract class ARessourceDetailsComponent<T extends AIdentifiable> implements OnInit {

  form;
  user = new User();
  private ressourceModif: T;
  private paramsId: string;


  constructor(private activatedRoute: ActivatedRoute, private salleService: SalleService,
              private authentificationService: AuthentificationService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: new FormControl(''),
      size: new FormControl('')
    });
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
    console.log('loadForm', this.ressourceModif);
    if (this.ressourceModif !== undefined) {
      this.form = this.formBuilder.group({
        firstName: new FormControl({value: this.ressourceModif.firstName, disabled: !this.user.userPermissions.includes('user.modify')}),
        lastName: new FormControl({value: this.ressourceModif.lastName, disabled: !this.user.userPermissions.includes('user.modify')}),
        email: new FormControl({value: this.ressourceModif.email, disabled: !this.user.userPermissions.includes('user.modify')})
      });
    }
  }

}
