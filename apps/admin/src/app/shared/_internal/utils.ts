import { INPUT_IDS } from './constants';

export const getInputIds = (obj: any) => {
  if (obj?.anyOf) {
    return getInputIds(obj?.anyOf[0]);
  }

  if (obj?.format === 'date-time') {
    return INPUT_IDS.DATE_PICKER;
  }

  if (obj?.type === 'string') {
    return INPUT_IDS.INPUT;
  }

  if (obj?.type === 'number') {
    return INPUT_IDS.INPUT_NUMBER;
  }

  return INPUT_IDS.INPUT;
};
