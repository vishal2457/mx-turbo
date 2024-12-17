import { Component, computed, inject, signal } from '@angular/core';
import { SocketService } from './shared/services/socket.service';
import { ApiService } from './shared/services/api.service';
import { FormControl } from '@angular/forms';
import { INPUT_LIST } from './shared/_internal/constants';
import { DynamicForm } from './shared/types/form.type';
import { SubSink } from './shared/utils/sub-sink';
import { getInputIds } from './shared/_internal/utils';

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
  removedKey: string[] = [];
  selectedSchema: any = {};
  schemaSelectControl = new FormControl();
  checkControl = new FormControl(true);

  private subs = new SubSink();

  ngOnInit(): void {
    this.handleSchemaSelection();
    this.api.get<any[]>('/get-all-schema').subscribe((data) => {
      this.schemaList = data.data;
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

  private handleSchemaSelection() {
    this.subs.sink = this.schemaSelectControl.valueChanges.subscribe(
      (value: string) => {
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
            },
          });
        }
        this.formList.set([...array]);
      },
    );
  }
}
