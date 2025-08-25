/**
 * 需求包括哪些：
 * 1. 全局有一个useRef
 * 2. fetch函数，fetch.then的第一步要看是不是有API竞态的情况
 * 第二步:success,setFetching(true);
 * 第三步：fail
*/



const fetchRef = useRef()

const { run: debounceFetcher } = useDebounceFn(
  (value: string) => {
    fetchRef.current += 1;
    const fetchId = fetchRef.current;
    setOptions([]);
    setFetching(true);

    getGroupList({
      pageSize: defaultMaxFetchSize,
      currentPage: 1,
      keyword: value,
      tenantCode,
    }).then(({ success, data }) => {
      if (fetchId !== fetchRef.current) {
        // for fetch callback order
        return;
      }
      if (success && data) {
        setOptions(
          data.dataList.map((group) => {
            return {
              label: group.name,
              value: group.groupId,
            };
          })
        );
      }
      setFetching(false);
    });
  },
  { wait: 300 }
);