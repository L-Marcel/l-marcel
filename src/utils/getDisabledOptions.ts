function getDisabledOptions<T>(config: T): T {
  const entries = Object.entries(config);
  
  return entries.reduce((pre, entrie) => {
    pre[entrie[0]] = false;
    return pre;
  }, {} as T);
};

export { getDisabledOptions };