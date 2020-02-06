import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthentificationService} from '../../authentification.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, RouterModule} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authentificationService: AuthentificationService, private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      username: new FormControl(this.fieldUsername, [Validators.minLength(3)]),
      password: new FormControl(this.fieldPassword, [Validators.minLength(5)])
    });
  }

  loginForm;
  fieldUsername;
  fieldPassword;

  messageError = '';

  get username() {return this.loginForm.get('username'); }
  get password() {return this.loginForm.get('password'); }

  logUser(log, event) {
    event.preventDefault();
    this.authentificationService.connectUser(log).subscribe(success => {

      if (success.message === 'SUCCESS') {
        console.log('succes de la connexion: ', success.uuid);
        this.authentificationService.changeRefreshToken(success.uuid);
        window.location.reload();
      } else if (success.message === 'ERROR') {
        this.messageError = 'Erreur lors de la connection.';
      }
    },
        error => {
      console.log(error);
      });
  }

}
