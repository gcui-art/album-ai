export enum FileStatus {
  Init = 'Init',
  Extract = 'Extract',
  Embedding = 'Embedding',
}

export const replacePlaceholders = (
  template: string,
  replacements: Record<string, string>,
) => {
  return template.replace(/\${(.*?)}/g, (_, g) => replacements[g] || '');
};
