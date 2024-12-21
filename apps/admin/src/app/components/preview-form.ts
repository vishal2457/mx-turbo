import { Component, computed, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicForm } from '../shared/types/form.type';

@Component({
  selector: 'preview-form',
  template: `
    <div class="bg-neutral-100 p-6 rounded-sm min-h-[calc(100vh-2.5rem)]">
      <mx-select
        class="block w-1/3 mb-10"
        [control]="previewControl"
        label="Preview"
        [items]="['Form', 'Datagrid']"
      />
      @if (previewControl.value === 'Form') {
        <div class="grid md:grid-cols-4 gap-3">
          @for (item of computedFormList(); track item?.config?.label) {
            <div>
              <dynamic-input
                [inputConfig]="item"
                [required]="item.config?.required"
              />
            </div>
          }
        </div>
      } @else if (previewControl.value === 'Datagrid') {
        @let pageSettingsValue = pageSettings();
        <page-header
          [header]="pageSettingsValue.pageHeader"
          [description]="pageSettingsValue.pageDescription"
          [showCancel]="false"
        >
          <mx-button>
            <span class="flex items-center">
              <p>{{ pageSettingsValue.addButtonText }}</p>
            </span>
          </mx-button>
        </page-header>
        <mx-data-grid
          [gridTitle]="pageSettingsValue.datagridTitle"
          [collectionSize]="8"
          [data]="dummyData()"
        >
          @for (item of computedDatagridColumns(); track item?.config?.label) {
            <mx-column
              [field]="item.id"
              [title]="item.config?.columnTitle || ''"
            />
          }
        </mx-data-grid>
      }
    </div>
  `,
})
export class PreviewFormComponent {
  previewFormList = input.required<DynamicForm[]>();
  pageSettings = input.required<any>();

  computedFormList = computed(() => {
    const existingForm = this.previewFormList();
    return existingForm.filter((i) => !i.config?.removed);
  });

  computedDatagridColumns = computed(() => {
    const columns = this.previewFormList();
    return columns.filter((i) => i.config?.addInTable);
  });

  dummyData = computed(() => {
    const columns = this.computedDatagridColumns();
    const dummyArray = Array.from({ length: 8 }, (_, index) => {
      const obj = {};
      columns.forEach((field) => {
        obj[field.id] = `${field.config?.label}-${index + 1}`;
      });
      return obj;
    });
    return dummyArray;
  });

  previewControl = new FormControl('Form');
}
