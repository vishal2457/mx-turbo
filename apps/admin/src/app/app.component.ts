import { Component, inject } from '@angular/core';
import { SocketService } from './shared/services/socket.service';
import { ApiService } from './shared/services/api.service';
import { FormControl } from '@angular/forms';
import { INPUT_LIST } from './shared/constants/input-lists.constant';
import { DynamicForm } from './shared/types/form.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Maximus';
  private api = inject(ApiService);

  inputList = INPUT_LIST;
  formList: DynamicForm[] = [];

  schemaList: any[] = [];
  removedKey: string[] = [];
  selectedSchema: any = {};
  schemaSelectControl = new FormControl();
  checkControl = new FormControl(true);

  ngOnInit(): void {
    this.api.get<any[]>('/get-all-schema').subscribe((data) => {
      this.schemaList = data.data;

      this.selectedSchema = this.schemaList[0];
    });
  }

  ngOnDestroy(): void {
    // this.subs.unsubscribe();
  }

  handleInputClick(inputID) {
    const position = this.formList.length - 1;
    this.formList.push({
      inputID: inputID,
      rowIndex: position,
      columnIndex: 0,
      config: {
        name: `test-${inputID}`,
        required: true,
        inputType: '',
      },
    });
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
}
