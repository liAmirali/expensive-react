export const getCorrectNoun = (count: number, singularForm: string, pluralForm: string) => {
  return count === 1 ? singularForm : pluralForm;
};

export const getUserDisplayName = (user: IUser | ITrimmedUser) => {
  return user.name || user.username || null;
};

export const getPrettyPrice = (price: number) => {
  return price.toFixed(2);
};

export const getMappedValues = <T extends { _id: string }>(arr: T[]) => {
  const m = new Map<string, T>();

  for (const item of arr) {
    m.set(item._id, item);
  }

  return m;
};
