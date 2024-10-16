import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './authentication.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { MxButtonComponent } from '../../shared/ui/button';
import { MxInputComponent } from '../../shared/ui/form/mx-input';
import { MxIconComponent } from '../../shared/ui/icon';
import { MxCardModule } from '../../shared/ui/card/card.module';
import { MxInputPasswordComponent } from '../../shared/ui/form/mx-input-password';
import { AuthContainerComponent } from './components/auth-container.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [LoginComponent, AuthContainerComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MxButtonComponent,
    MxInputComponent,
    MxIconComponent,
    MxCardModule,
    MxInputPasswordComponent,
  ],
})
export class AuthenticationModule {}
