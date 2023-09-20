export const getCorrectNoun = (count: number, singularForm: string, pluralForm: string) => {
  return count === 1 ? singularForm : pluralForm;
};

export const getUserDisplayName = (user: IUser) => {
  return user.name || user.username;
};
