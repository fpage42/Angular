import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {MDBBootstrapModule, TableModule} from 'angular-bootstrap-md';
import {CookieService} from 'ngx-cookie-service';
import {NavbarAdmComponent} from './panel-adm/navbar-adm/navbar-adm.component';
import {PanelAdmComponent} from './panel-adm/panel-adm.component';
import {PanelStudentComponent} from './panel-student/panel-student.component';
import {PanelTeacherComponent} from './panel-teacher/panel-teacher.component';
import {LoginComponent} from './login/login.component';
import {UserTabComponent} from './user-tab/user-tab.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {SalleTabComponent} from './salle-tab/salle-tab.component';
import {ReactiveFormsModule} from '@angular/forms';
import {GroupTabComponent} from './group-tab/group-tab.component';
import { FormsModule } from '@angular/forms';
import { SallesDetailsComponent } from './salles-details/salles-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarAdmComponent,
    PanelAdmComponent,
    PanelStudentComponent,
    PanelTeacherComponent,
    LoginComponent,
    UserTabComponent,
    UserProfileComponent,
    SalleTabComponent,
    GroupTabComponent,
    SallesDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    TableModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
