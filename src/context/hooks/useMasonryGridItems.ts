type ElementsMatrix = [JSX.Element[], JSX.Element[], JSX.Element[]];

export function useMasonryGridItems(
  isWide: boolean,
  isSmall: boolean,
  items: JSX.Element[]
): ElementsMatrix {
  const count = items.length;

  if (count === 0) {
    return [[], [], []];
  } else if (count === 1) {
    return [items, [], []];
  } else if (isWide) {
    //[0, 1, 2, 3, 4, 5, 6, 7]
    //[[0, 3, 6], [1, 4, 7], [2, 5]]

    return items.reduce(
      (pre, cur, i) => {
        switch (i % 3) {
          case 0:
            pre[0].push(cur);
            break;
          case 1:
            pre[1].push(cur);
            break;
          default:
            pre[2].push(cur);
            break;
        }

        return pre;
      },
      [[], [], []] as ElementsMatrix
    );
  } else if (isSmall) {
    //[0, 1, 2, 3, 4, 5, 6, 7]
    //[[0, 2], [1, 3], [4, 5, 6, 7]]

    const columns = items.reduce(
      (pre, cur, i) => {
        switch (i % 2) {
          case 0:
            pre[0].push(cur);
            break;
          default:
            pre[1].push(cur);
            break;
        }

        return pre;
      },
      [[], []] as [JSX.Element[], JSX.Element[]]
    );

    return [columns[0], columns[1], []];
  }

  return [items, [], []];
}
