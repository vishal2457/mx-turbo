import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { INPUT_LIST } from './shared/_internal/constants';
import { getInputIds } from './shared/_internal/utils';
import { ApiService } from './shared/services/api.service';
import { DynamicForm } from './shared/types/form.type';
import { SubSink } from './shared/utils/sub-sink';
import { getTitleCase } from './shared/utils/case.utils';
import { MxNotification } from './shared/ui/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Maximus';
  private api = inject(ApiService);
  private fb = inject(FormBuilder);
  private toast = inject(MxNotification);

  inputList = INPUT_LIST;
  formList = signal<DynamicForm[]>([]);
  computedFormList = computed(() => {
    const existingForm = this.formList();
    return existingForm.filter((i) => !i.config?.removed);
  });

  schemaList: any[] = [];
  pageSettings = this.fb.group({
    datagridTitle: [''],
    pageHeader: [''],
    pageDescription: [''],
    addButtonText: ['Add'],
    formPageTitleAdd: ['Add new'],
    formPageTitleUpdate: ['Update'],
  });
  existingData!: Record<string, { config: DynamicForm[]; pageSettings: any }>;
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
        this.existingData = data.existingData || {};
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

  handleSave(generate?: boolean) {
    this.api
      .post(
        `/save-schema-details?generate=${generate ? 1 : 0}`,
        this.getSavePayload(),
      )
      .subscribe((response) => {
        this.toast.show({ text: 'Saved' });
      });
  }

  private getSavePayload() {
    return {
      fieldConfig: this.formList(),
      name: this.schemaSelectControl.value,
      pageSettings: this.pageSettings.value,
    };
  }

  private handleSchemaSelection() {
    this.subs.sink = this.schemaSelectControl.valueChanges.subscribe(
      (value: string) => {
        const { config, pageSettings } = this.existingData[value] || {};
        if (pageSettings) {
          this.pageSettings.patchValue(pageSettings);
        } else {
          this.pageSettings.reset({
            formPageTitleAdd: `Create ${getTitleCase(value)}`,
            formPageTitleUpdate: `Update ${getTitleCase(value)}`,
            addButtonText: `Add ${getTitleCase(value)}`,
            pageHeader: getTitleCase(value),
            pageDescription: `Manage ${getTitleCase(value)}`,
            datagridTitle: `List of ${getTitleCase(value)}`,
          });
        }

        if (config?.length) {
          this.formList.update(() => [...config]);
          return;
        }

        const selectedSchema = this.schemaList.find(
          (schema) => schema.name === value,
        );

        const properties = Object.entries(selectedSchema?.properties);
        const array: DynamicForm[] = [];
        for (const [_, [key, value]] of properties.entries()) {
          const inputID = getInputIds(value);
          array.push({
            id: key,
            config: {
              label: getTitleCase(key),
              required: selectedSchema?.required.includes(key),
              inputType: inputID,
              removed: false,
              placeholder: `Enter ${key}`,
              addInTable: true,
              addinTableFilter: true,
              columnTitle: getTitleCase(key),
              row: null,
              col: null,
              selectItems: ['Value 1', 'Value 2', 'Value 3'],
            },
          });
        }

        this.formList.update(() => [...array]);
      },
    );
  }
}
