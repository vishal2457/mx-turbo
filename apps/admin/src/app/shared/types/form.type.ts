import { INPUT_IDS } from '../_internal/constants';

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
