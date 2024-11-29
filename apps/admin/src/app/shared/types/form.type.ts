import { INPUT_IDS } from '../constants/input-lists.constant';

export interface DynamicForm {
  inputID: INPUT_IDS;
  rowIndex: number;
  columnIndex: number;
  config?: {
    name: string;
    required: boolean;
    inputType: string;
  };
}
