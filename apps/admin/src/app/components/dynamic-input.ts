import { Component, computed, input, InputSignal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { INPUT_IDS } from '../shared/_internal/constants';
import { DynamicForm } from '../shared/types/form.type';

@Component({
  selector: 'dynamic-input',
  template: `
    @let field = inputConfig();
    @if (field?.inputID === INPUT_IDS.INPUT) {
      <mx-input
        [control]="control"
        [label]="field?.config?.name || ''"
        placeholder="Enter Name"
      />
    } @else if (field?.inputID === INPUT_IDS.INPUT_NUMBER) {
      <mx-input-number
        [control]="control"
        [label]="field?.config?.name || ''"
      />
    } @else if (field?.inputID === INPUT_IDS.INPUT_PASSWORD) {
      <mx-input-password
        [control]="control"
        [label]="field?.config?.name || ''"
      />
    } @else if (field?.inputID === INPUT_IDS.TEXTAREA) {
      <mx-textarea [control]="control" [label]="field?.config?.name || ''" />
    } @else if (field?.inputID === INPUT_IDS.FILE_UPLOAD) {
      <mx-file-upload />
    } @else if (field?.inputID === INPUT_IDS.MINI_COUNTER) {
      <mx-mini-counter
        [control]="control"
        [label]="field?.config?.name || ''"
      />
    } @else if (field?.inputID === INPUT_IDS.DATE_PICKER) {
      <mx-input
        [control]="control"
        [label]="field?.config?.name || ''"
        [type]="'date'"
      />
    } @else if (field?.inputID === INPUT_IDS.DATE_TIME_PICKER) {
      <mx-input
        [control]="control"
        [type]="'time'"
        [label]="field?.config?.name || ''"
      />
    } @else if (field?.inputID === INPUT_IDS.SELECT) {
      <mx-select
        [control]="control"
        [label]="field?.config?.name || ''"
        [items]="['In-progress', 'Completed', 'Paused']"
      />
    } @else if (field?.inputID === INPUT_IDS.MULTI_SELECT) {
      <mx-select
        [control]="control"
        [label]="field?.config?.name || ''"
        [items]="['In-progress', 'Completed', 'Paused']"
        [multiple]="true"
      />
    } @else if (field?.inputID === INPUT_IDS.CHECKBOX) {
      <mx-checkbox [control]="control" [label]="field?.config?.name || ''" />
    }
  `,
})
export class DynamicInputComponent {
  inputConfig: InputSignal<DynamicForm | undefined> = input();
  INPUT_IDS = INPUT_IDS;
  control = new FormControl('', [Validators.required]);
}
