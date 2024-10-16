import {
  AfterViewInit,
  Component,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { RoleFormComponent } from './role-form/role-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { FormGroup } from '@angular/forms';
import { SubSink } from '../../../shared/utils/sub-sink';
import { Router } from '@angular/router';
import { TRole } from '@repo/mx-schema';

@Component({
  selector: 'add-role',
  template: `<page-header header="Add Role">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <role-form />`,
})
export class CreateRoleComponent implements AfterViewInit, OnDestroy {
  @ViewChild(RoleFormComponent) RoleFormComponent!: RoleFormComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private router = inject(Router);

  roleForm!: FormGroup;
  private addRequests = new SubSink();

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  ngAfterViewInit(): void {
    this.roleForm = this.RoleFormComponent.roleForm;
  }

  handleSubmit() {
    if (this.roleForm.invalid) {
      this.RoleFormComponent.markAllAsTouched();
      return;
    }
    this.addRequests.unsubscribe();
    this.notif.show({
      text: 'Adding Role',
      id: 'add-role',
      type: 'loading',
    });

    this.addRequests.sink = this.api
      .post<TRole>('/role/create', this.roleForm.value)
      .subscribe({
        next: (data) => {
          this.roleForm.reset();
          this.notif.updateToast({
            text: 'Role added',
            id: 'add-role',
            type: 'success',
          });
          this.router.navigate([`/role/update/${data.data.id}`]);
        },
      });
  }
}
