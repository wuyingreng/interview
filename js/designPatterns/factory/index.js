export const getCacheOptionsFactory = () =>
  (() => {
    let cacheOptions: CommonOption[] = [];
    let promise: Promise<CommonOption[]> | null = null;
    return (params: GetOptionsParams) => {
      if (cacheOptions.length) return Promise.resolve(cacheOptions);
      if (!promise) {
        promise = new Promise((resolve) => {
          getOptions(params).then(({ success, data, errorMessage }) => {
            if (success) {
              cacheOptions = data;
              resolve(data);
            } else {
              message.error(errorMessage || 'API: /consumer/option/list error');
              resolve([]);
              promise = null;
            }
          });
        });
      }
      return promise;
    };
  })();
