import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'angular-bootstrap-md';
import {SalleService} from './salle/salle.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ATabComponent} from '../abstract/a-tab.component';
import {Router} from '@angular/router';
import {Salle} from '../models/salle';

@Component({
  selector: 'app-salle-tab',
  templateUrl: './salle-tab.component.html',
  styleUrls: ['./salle-tab.component.scss']
})

export class SalleTabComponent extends ATabComponent<Salle> implements OnInit {

  createSalleForm: FormGroup;
  @ViewChild(ModalDirective, {static: true}) createModal: ModalDirective;

  public constructor(protected cdRef: ChangeDetectorRef,
                     protected salleListService: SalleService,
                     protected router: Router) {
    super(cdRef, router);
    this.ressourceService = salleListService;
  }

  ngOnInit() {
    super.ngOnInit();
    this.createSalleForm = new FormGroup({
      salleName: new FormControl('', Validators.required),
      salleSize: new FormControl('', Validators.min(0))
    });
  }

  get formSalleName() {
    return this.createSalleForm.get('salleName');
  }

  get formSalleSize() {
    return this.createSalleForm.get('salleSize');
  }

  createSalle() {
    this.salleListService.createRessource(new Salle(this.formSalleName.value, this.formSalleSize.value));
    this.createModal.hide();
    this.createSalleForm.get('salleName').reset();
    this.createSalleForm.get('salleSize').reset();
  }

  displayDetails(uuid: string) {
    this.router.navigate(['/admin/salles/' + uuid]);
  }
}
