import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './shared/services/token-interceptor.service';
import { MxButtonComponent } from './shared/ui/button';
import { MxImageComponent } from './shared/ui/display-image';
import { MxDropdownModule } from './shared/ui/dropdown/dropdown.module';
import { MxInputComponent } from './shared/ui/form/mx-input';
import { MxIconComponent } from './shared/ui/icon';
import { GbNotificationModule } from './shared/ui/notification/notification.module';
import { MxOverlayComponent } from './shared/ui/overlay';
import { MxProgressbarComponent } from './shared/ui/progress-bar/progress-bar';
import { MxInputNumberComponent } from './shared/ui/form/mx-input-number';
import { MxCheckboxComponent } from './shared/ui/form/mx-checkbox';
import { DynamicInputComponent } from './components/dynamic-input';
import { MxCardModule } from './shared/ui/card/card.module';
import { MxSelectComponent } from './shared/ui/form/mx-select/mx-select';
import { MxBadgeComponent } from './shared/ui/badge';
import { MxInputPasswordComponent } from './shared/ui/form/mx-input-password';
import { MxTextareaComponent } from './shared/ui/form/textarea';
import { MxFileUploadComponent } from './shared/ui/form/mx-file-upload';
import { MxMiniCounterComponent } from './shared/ui/form/mini-counter';
import { InputConfigComponent } from './components/input-config';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PreviewFormComponent } from './components/preview-form';

@NgModule({
  declarations: [
    AppComponent,
    DynamicInputComponent,
    InputConfigComponent,
    PreviewFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MxButtonComponent,
    MxIconComponent,
    MxDropdownModule,
    MxInputComponent,
    MxProgressbarComponent,
    GbNotificationModule.forRoot(),
    MxImageComponent,
    MxOverlayComponent,
    MxInputComponent,
    MxInputNumberComponent,
    MxImageComponent,
    MxCheckboxComponent,
    MxDropdownModule,
    MxCardModule,
    HttpClientModule,
    MxSelectComponent,
    MxBadgeComponent,
    MxInputPasswordComponent,
    MxTextareaComponent,
    MxFileUploadComponent,
    MxMiniCounterComponent,
    MxSelectComponent,
    DragDropModule,
  ],
  providers: [
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
