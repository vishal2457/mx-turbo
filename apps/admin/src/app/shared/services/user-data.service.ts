import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { TUser } from '@repo/mx-schema';
import { MeResponse } from '../types/me-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<any | null>(null);
  private permissions = new BehaviorSubject<MeResponse['permissions']>([]);

  user$ = this.user.asObservable();
  permissions$ = this.permissions.asObservable();

  setUser(user: TUser) {
    this.user.next(user);
  }

  setPermission(permissions: MeResponse['permissions']) {
    this.permissions.next(permissions);
  }

  getPermission(menuName: string, permissions: MeResponse['permissions']) {
    return permissions
      .filter((p) => p.rolePermission.menuName === menuName)
      .map((p) => p.rolePermission.permission);
  }
}
