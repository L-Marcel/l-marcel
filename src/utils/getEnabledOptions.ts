function getEnabledOptions<T>(config: T): T {
  const entries = Object.entries(config);

  return entries.reduce((pre, entrie) => {
    pre[entrie[0]] = true;
    return pre;
  }, {} as T);
};

export { getEnabledOptions };