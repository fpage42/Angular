import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AIdentifiable} from '../../abstract/aidentifiable';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class GroupModule extends AIdentifiable {

  private _name: string;
  private _permissionsList: string[];

  constructor(name: string) {
    super();
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get permissionsList(): string[] {
    return this._permissionsList;
  }
}
