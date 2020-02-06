import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ATabComponent} from '../abstract/a-tab.component';
import {GroupModule} from './group/group.module';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalDirective} from 'angular-bootstrap-md';
import {Router} from '@angular/router';
import {GroupService} from './group/group.service';

@Component({
  selector: 'app-group-tab',
  templateUrl: './group-tab.component.html',
  styleUrls: ['./group-tab.component.scss']
})
export class GroupTabComponent extends ATabComponent<GroupModule> implements OnInit {

  createGroupForm: FormGroup;
  @ViewChild(ModalDirective, {static: true}) createModal: ModalDirective;

  public constructor(protected cdRef: ChangeDetectorRef,
                     protected groupService: GroupService,
                     protected router: Router) {
    super(cdRef, router);
    this.ressourceService = groupService;
  }

  ngOnInit() {
    super.ngOnInit();
    this.createGroupForm = new FormGroup({
      groupName: new FormControl('', Validators.required),
    });
  }

  get formGroupName() {
    return this.createGroupForm.get('groupName');
  }
  createGroup() {
    this.groupService.createRessource(new GroupModule(this.formGroupName.value));
    this.createModal.hide();
    this.createGroupForm.get('groupName').reset();
  }
}
