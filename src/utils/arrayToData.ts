function arrayToData<T = unknown>(arr: string[], defaultValue: T) {
  return arr.reduce(
    (prev, cur) => {
      prev[cur] = defaultValue;

      return prev;
    },
    {} as {
      [key: string]: T;
    }
  );
}

export default arrayToData;
