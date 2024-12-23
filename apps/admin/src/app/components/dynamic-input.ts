import { Component, computed, effect, input, InputSignal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { INPUT_IDS } from '../shared/_internal/constants';
import { DynamicForm } from '../shared/types/form.type';

@Component({
  selector: 'dynamic-input',
  template: `
    @let field = inputConfig();
    @if (field?.config?.inputType === INPUT_IDS.INPUT) {
      <mx-input
        [control]="control"
        [label]="field?.config?.label || ''"
        [placeholder]="field?.config?.placeholder || ''"
        [requiredAstrick]="!!field?.config?.required"
      />
    } @else if (field?.config?.inputType === INPUT_IDS.INPUT_NUMBER) {
      <mx-input-number
        [control]="control"
        [label]="field?.config?.label || ''"
        [placeholder]="field?.config?.placeholder || ''"
        [requiredAstrick]="!!field?.config?.required"
      />
    } @else if (field?.config?.inputType === INPUT_IDS.INPUT_PASSWORD) {
      <mx-input-password
        [control]="control"
        [label]="field?.config?.label || ''"
        [placeholder]="field?.config?.placeholder || ''"
        [requiredAstrick]="!!field?.config?.required"
      />
    } @else if (field?.config?.inputType === INPUT_IDS.TEXTAREA) {
      <mx-textarea
        [control]="control"
        [label]="field?.config?.label || ''"
        [placeholder]="field?.config?.placeholder || ''"
        [requiredAstrick]="!!field?.config?.required"
      />
    } @else if (field?.config?.inputType === INPUT_IDS.FILE_UPLOAD) {
      <mx-file-upload [label]="field?.config?.label || ''" />
    } @else if (field?.config?.inputType === INPUT_IDS.MINI_COUNTER) {
      <mx-mini-counter
        [control]="control"
        [label]="field?.config?.label || ''"
        [requiredAstrick]="!!field?.config?.required"
      />
    } @else if (field?.config?.inputType === INPUT_IDS.DATE_PICKER) {
      <mx-input
        [control]="control"
        [label]="field?.config?.label || ''"
        [type]="'date'"
        [requiredAstrick]="!!field?.config?.required"
      />
    } @else if (field?.config?.inputType === INPUT_IDS.DATE_TIME_PICKER) {
      <mx-input
        [control]="control"
        [type]="'time'"
        [label]="field?.config?.label || ''"
        [requiredAstrick]="!!field?.config?.required"
      />
    } @else if (field?.config?.inputType === INPUT_IDS.SELECT) {
      <mx-select
        [control]="control"
        [label]="field?.config?.label || ''"
        [items]="field?.config?.selectItems || []"
        [placeholder]="field?.config?.placeholder || ''"
        [requiredAstrick]="!!field?.config?.required"
      />
    } @else if (field?.config?.inputType === INPUT_IDS.MULTI_SELECT) {
      <mx-select
        [control]="control"
        [label]="field?.config?.label || ''"
        [items]="field?.config?.selectItems || []"
        [multiple]="true"
        [requiredAstrick]="!!field?.config?.required"
      />
    } @else if (field?.config?.inputType === INPUT_IDS.CHECKBOX) {
      <mx-checkbox [control]="control" [label]="field?.config?.label || ''" />
    }
  `,
})
export class DynamicInputComponent {
  inputConfig: InputSignal<DynamicForm | undefined> = input();
  required = input<boolean>();
  INPUT_IDS = INPUT_IDS;
  control = new FormControl('', []);

  constructor() {
    effect(() => {
      const req = this.required();
      if (req) {
        this.control.addValidators([Validators.required]);
        this.control.updateValueAndValidity();
      } else if (this.control.hasValidator(Validators.required)) {
        this.control.removeValidators(Validators.required);
        this.control.updateValueAndValidity();
      }
    });
  }
}
