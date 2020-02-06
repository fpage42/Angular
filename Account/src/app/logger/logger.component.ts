import { Component, OnInit } from '@angular/core';
import {RouterModule, Router} from '@angular/router';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss']
})
export class LoggerComponent implements OnInit {

  registerMode = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

}
