import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBaseComponent } from './base-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlPipe } from '../../pipe/form-control';
import { MxHintComponent } from '../hint';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MxFormErrorComponent } from './form-error';

@Component({
  selector: 'mx-textarea',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FormControlPipe,
    MxHintComponent,
    TextFieldModule,
    MxFormErrorComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      @if (label) {
        <label
          [for]="_id"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {{ label }}
          @if (requiredAstrick()) {
            <span class="text-red-600">*</span>
          }
        </label>
      }
      <textarea
        cdkTextareaAutosize
        cdkAutosizeMinRows="1"
        cdkAutosizeMaxRows="10"
        [formControl]="control() | formControl"
        [placeholder]="placeholder"
        class="flex min-h-[60px] w-full rounded-md border border-input px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      >
      </textarea>
      <mx-form-error
        [errors]="control().errors"
        [showError]="control().touched || control().dirty"
      />
      @for (hint of hints; track hint) {
        <mx-hint [message]="hint" />
      }
    </div>
  `,
})
export class MxTextareaComponent extends FormBaseComponent {}
