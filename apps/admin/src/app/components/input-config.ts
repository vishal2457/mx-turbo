import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { INPUT_IDS, INPUT_LIST } from '../shared/_internal/constants';

@Component({
  selector: 'input-config',
  template: `<mx-overlay>
    <mx-button trigger>config</mx-button>
    <div class="p-3 flex flex-col gap-3">
      <mx-input [control]="configForm.controls.label" />
      <mx-checkbox label="Remove" [control]="configForm.controls.removed" />
      <mx-checkbox
        label="Required Field"
        [control]="configForm.controls.required"
      />
    </div>
  </mx-overlay>`,
})
export class InputConfigComponent {
  private fb = inject(FormBuilder);
  inputList = INPUT_LIST;

  protected configForm = this.fb.group({
    label: [''],
    placeholder: [''],
    removed: [false],
    required: [false],
    inputType: [INPUT_IDS.INPUT],
  });
}
