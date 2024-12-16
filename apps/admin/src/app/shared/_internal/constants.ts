export enum INPUT_IDS {
  INPUT,
  INPUT_NUMBER,
  SELECT,
  FILE_UPLOAD,
  INPUT_PASSWORD,
  TEXTAREA,
  MINI_COUNTER,
  CHECKBOX,
  DATE_PICKER,
  DATE_TIME_PICKER,
  PHONE,
  SWITCH,
  MULTI_SELECT,
  RADIO_BUTTON,
}
export const INPUT_LIST = [
  {
    name: 'Input',
    id: INPUT_IDS.INPUT,
  },
  {
    name: 'Input Number',
    id: INPUT_IDS.INPUT_NUMBER,
  },
  {
    name: 'Select',
    id: INPUT_IDS.SELECT,
  },
  {
    name: 'File Upload',
    id: INPUT_IDS.FILE_UPLOAD,
  },
  {
    name: 'Input Password',
    id: INPUT_IDS.INPUT_PASSWORD,
  },
  {
    name: 'Textarea',
    id: INPUT_IDS.TEXTAREA,
  },
  {
    name: 'Mini Counter',
    id: INPUT_IDS.MINI_COUNTER,
  },
  {
    name: 'Checkbox',
    id: INPUT_IDS.CHECKBOX,
  },
  {
    name: 'Datepicker',
    id: INPUT_IDS.DATE_PICKER,
  },
  {
    name: 'Datepicker Time',
    id: INPUT_IDS.DATE_TIME_PICKER,
  },
  {
    name: 'Phone',
    id: INPUT_IDS.PHONE,
  },
  {
    name: 'Switch',
    id: INPUT_IDS.SWITCH,
  },
  {
    name: 'Multi Select',
    id: INPUT_IDS.MULTI_SELECT,
  },
  {
    name: 'Radio Button',
    id: INPUT_IDS.RADIO_BUTTON,
  },
];

export const DATATYPE_TO_INPUT_MAPPING = {
  string: INPUT_IDS.INPUT,
  number: INPUT_IDS.INPUT_NUMBER,
};
