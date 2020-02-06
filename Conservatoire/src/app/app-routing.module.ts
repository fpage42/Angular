import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PanelAdmComponent} from './panel-adm/panel-adm.component';
import {PanelTeacherComponent} from './panel-teacher/panel-teacher.component';
import {PanelStudentComponent} from './panel-student/panel-student.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  {path: '', component: PanelAdmComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: PanelAdmComponent},
  {path: 'admin/users', component: PanelAdmComponent},
  {path: 'admin/users/:id', component: PanelAdmComponent},
  {path: 'admin/salles', component: PanelAdmComponent},
  {path: 'admin/salles/:id', component: PanelAdmComponent},
  {path: 'admin/groupes', component: PanelAdmComponent},
  {path: 'student', component: PanelStudentComponent},
  {path: 'teacher', component: PanelTeacherComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
