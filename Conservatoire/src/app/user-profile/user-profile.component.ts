import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserListService} from '../user-tab/userService/user-list.service';
import {AuthentificationService} from '../authentification.service';
import {User} from '../models/user';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  form;
  user = new User();
  private userModif: User;
  private paramsId: string;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserListService,
              private authentificationService: AuthentificationService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('')
    });
  }

  onSubmit(datas) {
    this.userModif.email = datas.email;
    this.userModif.firstName = datas.firstName;
    this.userModif.lastName = datas.lastName;
    this.userService.saveChange(this.userModif);
  }

  ngOnInit() {
    this.authentificationService.user.subscribe(user => {
      this.user = user;
      this.loadForm();
    });
    this.activatedRoute.params.subscribe(params => {
      this.paramsId = params.id;
      this.userService.loadRessource(params.id);
    });
    this.userService.ressources.subscribe(users => {
      this.userModif = users.find(user => user.uuid === this.paramsId);
      this.loadForm();
    });
  }

  private loadForm() {
    console.log('loadForm', this.userModif);
    if (this.userModif !== undefined) {
      this.form = this.formBuilder.group({
        firstName: new FormControl({value: this.userModif.firstName, disabled: !this.user.userPermissions.includes('user.modify')}),
        lastName: new FormControl({value: this.userModif.lastName, disabled: !this.user.userPermissions.includes('user.modify')}),
        email: new FormControl({value: this.userModif.email, disabled: !this.user.userPermissions.includes('user.modify')})
      });
    }
  }
}
