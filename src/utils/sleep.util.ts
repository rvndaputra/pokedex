export const sleep = (ms: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const sleepModuleLazy = (module: any, ms: number) => {
  return Promise.all([module, sleep(ms)]).then(
    ([moduleExports]) => moduleExports
  );
};
