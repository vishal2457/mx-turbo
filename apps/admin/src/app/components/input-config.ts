import {
  Component,
  inject,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { INPUT_IDS, INPUT_LIST } from '../shared/_internal/constants';
import { DynamicForm } from '../shared/types/form.type';
import { SubSink } from '../shared/utils/sub-sink';

@Component({
  selector: 'input-config',
  template: `<mx-overlay>
    <mx-button variant="secondary" trigger>
      <mx-icon icon="edit" />
    </mx-button>
    <div class="p-3">
      <p class="mb-3 text-xl">Form Config</p>
      <div class=" flex flex-col gap-3">
        <mx-checkbox label="Remove" [control]="configForm.controls.removed" />
        <mx-checkbox
          label="Required Field"
          [control]="configForm.controls['required']"
        />
        <mx-select
          [control]="configForm.controls.inputType"
          [items]="inputList"
          bindLabel="name"
          bindValue="id"
          label="Input Type"
          [requiredAstrick]="true"
        />
        @if (
          configForm.controls.inputType.value === INPUT_IDS.SELECT ||
          configForm.controls.inputType.value === INPUT_IDS.MULTI_SELECT
        ) {
          <mx-input
            [control]="configForm.controls.selectItems"
            label="Select Items"
            [requiredAstrick]="true"
            [hints]="['Add comma separated values']"
          />
        }
        <mx-input
          [control]="configForm.controls.label"
          label="Label"
          placeholder="Enter Label"
        />
        <mx-input
          [control]="configForm.controls['placeholder']"
          label="Placeholder"
          placeholder="Enter placeholder"
        />
        <div class="flex gap-2">
          <mx-input
            label="Row"
            [control]="configForm.controls.row"
            placeholder="Enter row"
            [type]="'number'"
          />
          <mx-input
            label="Col"
            [control]="configForm.controls.col"
            placeholder="Enter col"
            [type]="'number'"
          />
        </div>
      </div>
      <p class="mt-5 mb-3 text-xl">Datagrid Config</p>
      <div class=" flex flex-col gap-3">
        <mx-checkbox
          label="Add In Table"
          [control]="configForm.controls.addInTable"
        />
        <mx-checkbox
          label="Add In Table Filter"
          [control]="configForm.controls.addinTableFilter"
        />
        <mx-input
          [control]="configForm.controls.columnTitle"
          label="Column Title"
          placeholder="Enter column title"
        />
      </div>
    </div>
  </mx-overlay>`,
})
export class InputConfigComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  inputList = INPUT_LIST;
  fieldConfig: InputSignal<DynamicForm | undefined> = input();
  configChange = output<any>();

  fieldID!: string | undefined;
  INPUT_IDS = INPUT_IDS;
  private subs = new SubSink();

  protected configForm = this.fb.group({
    label: [''],
    placeholder: [''],
    removed: [false],
    required: [false],
    inputType: [INPUT_IDS.INPUT],
    addInTable: [false],
    addinTableFilter: [false],
    columnTitle: [''],
    row: new FormControl<number | null>(null),
    col: new FormControl<number | null>(null),
    selectItems: [''],
  });

  ngOnInit(): void {
    const field = this.fieldConfig();
    this.fieldID = field?.id;

    this.configForm.patchValue({
      label: field?.config?.label,
      removed: field?.config?.removed,
      placeholder: field?.config?.placeholder,
      inputType: field?.config?.inputType,
      required: field?.config?.required,
      addInTable: field?.config?.addInTable,
      addinTableFilter: field?.config?.addinTableFilter,
      columnTitle: field?.config?.columnTitle,
      row: field?.config?.row,
      col: field?.config?.col,
    });

    this.subs.sink = this.configForm.valueChanges.subscribe((value) =>
      this.configChange.emit({
        ...value,
        id: this.fieldID,
        selectItems: value?.selectItems?.split(',') || [],
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  protected handleInputChange(fieldID: INPUT_IDS) {
    this.configForm.patchValue({ inputType: fieldID });
  }
}
