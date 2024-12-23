import { INPUT_IDS } from '../_internal/constants';

export interface DynamicForm {
  id: string;
  config?: {
    label: string;
    required: boolean;
    inputType: INPUT_IDS;
    removed: boolean;
    placeholder?: string;
    addInTable: boolean;
    addinTableFilter: boolean;
    columnTitle: string;
    row: number | null;
    col: number | null;
    selectItems: string[];
  };
}
