export const getCorrectNoun = (count: number, singularForm: string, pluralForm: string) => {
  return count === 1 ? singularForm : pluralForm;
};
