export enum FileStatus {
  Init = 'Init',
  Extract = 'Extract',
  Embedding = 'Embedding',
}

export const replacePlaceholders = (template: string, ...args: any[]) => {
  return template.replace(/{(\d+)}/g, (match, index) => {
    return typeof args[index] !== 'undefined' ? args[index] : match;
  });
};
