export const convertToUserMap = (people: IUser[], ids: string[]) => {
  const map = new Map<string, IUser>();

  for (const id of ids) {
    const person = people.find((p) => p._id === id);
    if (person) {
      map.set(id, person);
    }
  }

  return map;
};
