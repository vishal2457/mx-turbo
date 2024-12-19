import { Component, input } from '@angular/core';
import { DynamicForm } from '../shared/types/form.type';

@Component({
  selector: 'preview-form',
  template: `
    <div class="bg-neutral-100 p-6 rounded-sm h-[calc(100vh-2.5rem)]">
      <p class="text-2xl mb-3">Preview</p>
      <div class="grid md:grid-cols-2 gap-3">
        @for (item of previewFormList(); track item?.config?.label) {
          <div>
            <dynamic-input
              [inputConfig]="item"
              [required]="item.config?.required"
            />
          </div>
        }
      </div>
    </div>
  `,
})
export class PreviewFormComponent {
  previewFormList = input.required<DynamicForm[]>();
}
