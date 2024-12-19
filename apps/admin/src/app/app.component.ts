import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, computed, inject, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { INPUT_LIST } from './shared/_internal/constants';
import { getInputIds } from './shared/_internal/utils';
import { ApiService } from './shared/services/api.service';
import { DynamicForm } from './shared/types/form.type';
import { SubSink } from './shared/utils/sub-sink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Maximus';
  private api = inject(ApiService);

  inputList = INPUT_LIST;
  formList = signal<DynamicForm[]>([]);
  computedFormList = computed(() => {
    const existingForm = this.formList();

    return existingForm.filter((i) => !i.config?.removed);
  });

  schemaList: any[] = [];
  existingData!: Record<string, DynamicForm[]>;
  removedKey: string[] = [];
  selectedSchema: any = {};
  schemaSelectControl = new FormControl();
  checkControl = new FormControl(true);

  private subs = new SubSink();

  ngOnInit(): void {
    this.handleSchemaSelection();

    this.subs.sink = this.api
      .get<any[]>('/get-all-schema')
      .subscribe((data) => {
        this.schemaList = data.data;
        this.existingData = data.existingData;
        this.schemaSelectControl.patchValue(this.schemaList[0]?.name);
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  selectSchema(schema: any) {
    this.removedKey = [];
    this.selectedSchema = schema;
  }

  getKeyAsString(item: any): string {
    if (item?.value?.type) {
      return `${item.key}: ${item.value.type}`;
    }
    return typeof item?.key === 'string'
      ? `${item.key}: ${item.value.type}`
      : '';
  }

  handleFormChange({ id, ...rest }: DynamicForm['config'] & { id: string }) {
    this.formList.update((existingForm) => {
      const fieldIndex = existingForm.findIndex((i) => i.id === id);
      existingForm[fieldIndex].config = { ...rest };
      return [...existingForm];
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.formList(), event.previousIndex, event.currentIndex);
  }

  handleSave() {
    this.api
      .post('/save-schema-details', {
        fieldConfig: this.formList(),
        name: this.schemaSelectControl.value,
      })
      .subscribe((response) => {
        console.log(response, 'Response');
      });
  }

  handleSaveAndGenerate() {
    this.api
      .post(`/generate-crud/${this.schemaSelectControl.value}`, {
        fieldConfig: this.formList(),
      })
      .subscribe((response) => {
        console.log(response, 'Response');
      });
  }

  private handleSchemaSelection() {
    this.subs.sink = this.schemaSelectControl.valueChanges.subscribe(
      (value: string) => {
        const existingData = this.existingData[value];

        if (existingData?.length) {
          this.formList.update(() => [...existingData]);
          return;
        }

        const selectedSchema = this.schemaList.find(
          (schema) => schema.name === value,
        );

        const properties = Object.entries(selectedSchema?.properties);
        const array: DynamicForm[] = [];
        for (const [index, [key, value]] of properties.entries()) {
          const inputID = getInputIds(value);
          array.push({
            rowIndex: index,
            columnIndex: 0,
            id: key,
            config: {
              label: key,
              required: selectedSchema?.required.includes(key),
              inputType: inputID,
              removed: false,
              placeholder: `Enter ${key}`,
              addInTable: true,
              addinTableFilter: true,
            },
          });
        }

        this.formList.update(() => [...array]);
      },
    );
  }
}
