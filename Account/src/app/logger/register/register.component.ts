import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../../authentification.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authentificationService: AuthentificationService, private formBuilder: FormBuilder) {
    this.subscriptionForm = this.formBuilder.group({
      email: new FormControl(this.fieldEmail, [Validators.required, Validators.email]),
      username: new FormControl(this.fieldUsername, [Validators.minLength(3)]),
      password: new FormControl(this.fieldPassword, [Validators.minLength(5)])
    });
  }

  subscriptionForm;
  messageError = '';

  fieldEmail;
  fieldUsername;
  fieldPassword;

  get email() { return this.subscriptionForm.get('email'); }
  get username() { return this.subscriptionForm.get('username'); }
  get password() { return this.subscriptionForm.get('password'); }

  registerUser(subscription, event) {
    event.preventDefault();
    this.authentificationService.registerUser(subscription).subscribe(success => {
      this.setMessageError(success.message);
    });
  }

  private setMessageError(error: string)
  {
    switch (error) {
      case 'ERROR_FORM_EMAIL':
        this.messageError = 'Votre email semble invalide.';
        break;
      case 'ERROR_ALREADYUSED_EMAIL':
        this.messageError = 'Cet email est déjà utilisé';
        break;
      case 'ERROR_FORM_USERNAME':
        this.messageError = 'Votre nom d\'utilisateur semble invalide.';
        break;
      case 'ERROR_ALREADYUSED_USERNAME':
        this.messageError = 'Votre nom d\'utilisateur est déjà utilisé.';
        break;
      case 'ERROR_FORM_PASSWORD':
        this.messageError = 'Votre mot de passe est invalide.';
        break;
      default:
        this.messageError = 'Unknow error';
        break;
    }
  }

  ngOnInit(): void {
  }

}
