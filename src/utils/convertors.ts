const convertToUserMap = (people: IUser[], ids: string[]) => {
  const map = new Map<string, IUser>();

  for (let id of ids) {
    const person = people.find((p) => p._id === id);
    if (person) {
      map.set(id, person);
    }
  }

  return map;
};
