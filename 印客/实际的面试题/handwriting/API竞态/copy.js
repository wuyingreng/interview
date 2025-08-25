
// ? 第一个你不会做的就是useRef怎么赋值初始值
const fetchRef = useRef(0)

const fetchGroupList = (params) => {
  fetchRef.current += 1;
  let fetchId = fetchRef.current;
  setFetch(true)
  getGroupList(params).then((res) => {
    if (fetchId !== fetchRef.current) {
      return;
    }
    if (success && res.data) {
      setData(res.data)
    }
    setFetch(false);
  })
}