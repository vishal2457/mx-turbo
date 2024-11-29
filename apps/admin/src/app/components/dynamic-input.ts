import { Component, computed, input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { INPUT_IDS } from '../shared/constants/input-lists.constant';

@Component({
  selector: 'dynamic-input',
  template: `
    @let input = inputID();
    @if (input === INPUT_IDS.INPUT) {
      <mx-input [control]="control" label="Name" placeholder="Enter Name" />
    } @else if (input === INPUT_IDS.INPUT_NUMBER) {
      <mx-input-number [control]="control" label="Age" />
    } @else if (input === INPUT_IDS.INPUT_PASSWORD) {
      <mx-input-password [control]="control" label="Password" />
    } @else if (input === INPUT_IDS.TEXTAREA) {
      <mx-textarea [control]="control" label="Description" />
    } @else if (input === INPUT_IDS.FILE_UPLOAD) {
      <mx-file-upload />
    } @else if (input === INPUT_IDS.MINI_COUNTER) {
      <mx-mini-counter [control]="control" label="Counter" />
    } @else if (input === INPUT_IDS.DATE_PICKER) {
      <mx-input [control]="control" [type]="'date'" />
    } @else if (input === INPUT_IDS.DATE_TIME_PICKER) {
      <mx-input [control]="control" [type]="'time'" />
    } @else if (input === INPUT_IDS.SELECT) {
      <mx-select
        [control]="control"
        label="Status"
        [items]="['In-progress', 'Completed', 'Paused']"
      />
    } @else if (input === INPUT_IDS.MULTI_SELECT) {
      <mx-select
        [control]="control"
        label="Status"
        [items]="['In-progress', 'Completed', 'Paused']"
        [multiple]="true"
      />
    } @else if (input === INPUT_IDS.CHECKBOX) {
      <mx-checkbox [control]="control" label="Active" />
    }
  `,
})
export class DynamicInputComponent {
  inputID = input();
  INPUT_IDS = INPUT_IDS;
  control = new FormControl('', [Validators.required]);
}
