import { INPUT_IDS } from '../_internal/constants';

export interface DynamicForm {
  rowIndex: number;
  columnIndex: number;
  id: string;
  config?: {
    label: string;
    required: boolean;
    inputType: INPUT_IDS;
    removed: boolean;
    placeholder?: string;
    addInTable: boolean;
    addinTableFilter: boolean;
  };
}
