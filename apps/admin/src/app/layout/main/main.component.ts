import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  Event as RouterEvent,
} from '@angular/router';
import { SidebarService } from '../../shared/services/sidebar.service';
import { ThemeService } from '../../shared/services/theme.service';
import { MxProgressbarComponent } from '../../shared/ui/progress-bar/progress-bar';
import { SubSink } from '../../shared/utils/sub-sink';
import { UserService } from '../../shared/services/user-data.service';
import { ApiService } from '../../shared/services/api.service';
import { MENU_DATA } from '../../shared/constants/menu-contstant';

type MeResponse = {
  permissions: Array<{
    rolePermission: {
      id: number;
      permission: string;
      menuName: string;
      roleID: number;
    };
    role: {
      id: number;
      name: string;
      description: string;
      organisationID: number;
    };
    userRole: {
      id: number;
      roleID: number;
      userID: number;
    };
  }>;
  user: any;
  organisation: any;
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnDestroy, OnInit {
  @ViewChild('mxProgress') progressBar!: MxProgressbarComponent;

  themeService = inject(ThemeService);
  sidebarService = inject(SidebarService);
  private router = inject(Router);
  private userService = inject(UserService);
  private api = inject(ApiService);

  private subs = new SubSink();

  ngOnInit(): void {
    this.initUser();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  initUser() {
    this.api.get<MeResponse>('/user/me').subscribe({
      next: (result) => {
        this.userService.setUser(result.data.user);
        this.userService.setPermission(result.data.permissions);
        // TODO: change menu according to permission
      },
    });
  }
}
