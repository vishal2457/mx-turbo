import * as changeCase from 'change-case';

export const getTitleCase = (str: string) => {
  return changeCase.capitalCase(str);
};
