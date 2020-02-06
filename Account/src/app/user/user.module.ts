import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class User {

  private userToken: string;
  private username: string;
  private userEmail: string;
  private permissions: string[];
}
