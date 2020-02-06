import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from './authentification.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Conservatoire';

  constructor(private authentificationService: AuthentificationService, private router: Router, private location: Location) {
  }

  ngOnInit(): void {
  }

}
