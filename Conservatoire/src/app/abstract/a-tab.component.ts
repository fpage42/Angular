import {AfterViewInit, ChangeDetectorRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {AServiceRessource} from './a-service-ressource';
import {AIdentifiable} from './aidentifiable';

export abstract class ATabComponent<T extends AIdentifiable> implements OnInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  elements: T[] = [];
  previous: any = [];

  protected ressourceService: AServiceRessource<T>;

  protected constructor(protected cdRef: ChangeDetectorRef,
                        protected router: Router) { }

  ngOnInit() {
    this.ressourceService.ressources.subscribe(value => {
      if (value != null) {
        this.elements = value;
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      }
    });
    this.ressourceService.loadRessourcesList();
  }
}
