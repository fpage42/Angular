import {ChangeDetectorRef, Component} from '@angular/core';
import {UserListService} from './userService/user-list.service';
import {Router} from '@angular/router';
import {ATabComponent} from '../abstract/a-tab.component';
import {User} from '../models/user';

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.scss']
})
export class UserTabComponent extends ATabComponent<User> {

  public constructor(protected cdRef: ChangeDetectorRef,
                     protected userListService: UserListService,
                     protected router: Router) {
    super(cdRef, router);
    this.ressourceService = userListService;
  }

  displayProfile(uuid: string) {
    this.router.navigate(['/admin/users/' + uuid]);
  }
}
