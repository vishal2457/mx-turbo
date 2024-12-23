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
        [items]="['Form', 'Datagrid', 'Api Configuration']"
      />
      @let pageSettingsValue = pageSettings();

      @if (previewControl.value === 'Form') {
        <page-header [header]="pageSettingsValue.formPageTitleAdd">
          <mx-button>
            <span class="flex items-center">
              <p>Save</p>
            </span>
          </mx-button>
        </page-header>
        <div class="grid gap-3" [ngStyle]="gridStyles()">
          @for (row of groupedFields(); track row.rowPosition) {
            @for (item of row.fields; track item.config?.label) {
              <div [ngStyle]="getFieldStyles(item)">
                <dynamic-input
                  [inputConfig]="item"
                  [required]="item.config?.required"
                />
              </div>
            }
          }
        </div>
      } @else if (previewControl.value === 'Datagrid') {
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
      } @else if (previewControl.value === 'Api Configuration') {
        @let schemaId = schemaID();
        <div class="overflow-x-auto">
          <table
            class="table-auto border-collapse border border-gray-300 w-full"
          >
            <thead>
              <tr class="bg-gray-200">
                <th class="border border-gray-300 px-4 py-2">Method</th>
                <th class="border border-gray-300 px-4 py-2">Description</th>
                <th class="border border-gray-300 px-4 py-2">Endpoint</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2">GET</td>
                <td class="border border-gray-300 px-4 py-2">
                  Get list with filters
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  /{{ schemaId }}/list
                </td>
              </tr>

              <tr>
                <td class="border border-gray-300 px-4 py-2">POST</td>
                <td class="border border-gray-300 px-4 py-2">Create</td>
                <td class="border border-gray-300 px-4 py-2">
                  /{{ schemaId }}/create
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">GET</td>
                <td class="border border-gray-300 px-4 py-2">Get by ID</td>
                <td class="border border-gray-300 px-4 py-2">
                  /{{ schemaId }}/details/:id
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">PUT</td>
                <td class="border border-gray-300 px-4 py-2">Update</td>
                <td class="border border-gray-300 px-4 py-2">
                  /{{ schemaId }}/update/:id
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">DELETE</td>
                <td class="border border-gray-300 px-4 py-2">Delete</td>
                <td class="border border-gray-300 px-4 py-2">
                  /{{ schemaId }}/delete/:id
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- <p>GET list: /{{ schemaId }}/list</p>
        <p>GET by id: /{{ schemaId }}/details/:id</p>
        <p>POST create: /{{ schemaId }}/create</p>
        <p>PUT update: /{{ schemaId }}/update/:id</p>
        <p>DELETE delete: /{{ schemaId }}/delete/:id</p> -->
      }
    </div>
  `,
})
export class PreviewFormComponent {
  previewFormList = input.required<DynamicForm[]>();
  pageSettings = input.required<any>();
  schemaID = input.required<string>();

  computedFormList = computed(() => {
    const existingForm = this.previewFormList();
    return existingForm.filter((i) => !i.config?.removed);
  });

  computedDatagridColumns = computed(() => {
    const columns = this.previewFormList();
    return columns.filter((i) => i.config?.addInTable);
  });

  gridStyles = computed(() => {
    const maxCol = Math.max(
      ...this.computedFormList().map((field) => field.config?.col || 1),
    );

    return {
      'grid-template-columns': `repeat(${maxCol}, minmax(0, 1fr))`,
      'grid-auto-rows': 'minmax(min-content, auto)',
    };
  });

  // Group fields by row for better organization
  groupedFields = computed(() => {
    const fields = this.computedFormList();
    const groupedByRow = fields.reduce(
      (acc, field) => {
        const rowPosition = field.config?.row || 1;
        if (!acc[rowPosition]) {
          acc[rowPosition] = {
            rowPosition,
            fields: [],
          };
        }
        acc[rowPosition].fields.push(field);
        return acc;
      },
      {} as Record<number, { rowPosition: number; fields: any[] }>,
    );
    // Sort by row position and return as array
    return Object.values(groupedByRow).sort(
      (a: any, b: any) => a.rowPosition - b.rowPosition,
    );
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

  getFieldStyles(field: any) {
    return {
      'grid-column': field.config?.col || 'auto',
      'grid-row': field.config?.row || 'auto',
    };
  }

  previewControl = new FormControl('Form');
}
