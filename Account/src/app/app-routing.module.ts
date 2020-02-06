import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoggerComponent} from './logger/logger.component';
import {AuthorizationComponent} from './authorization/authorization.component';
import {LogoutComponent} from './logout/logout.component';

const routes: Routes = [
  {path: 'login', component: LoggerComponent},
  {path: '', component: LoggerComponent},
  {path: 'authorization/:clientUuid', component: AuthorizationComponent},
  {path: 'logout/:clientUuid', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
