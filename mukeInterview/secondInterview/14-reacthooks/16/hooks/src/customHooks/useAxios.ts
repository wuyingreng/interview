import { useEffect, useState } from "react";
import axios from 'axios';


export const useAxios = (url: string, config = {}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState()

  useEffect(() => {
    setLoading(true)
    axios.get(url).then((res: any) => {
      setData(res);
    }).catch((err: any) => {
      setError(err)
    }).finally(() => {
      //这样不用再then catch里面写两遍
      setLoading(false)
    });
    // useEffect里面的return函数是用来在组件卸载的时候执行逻辑
  }, [url, config]);

  // 自定义hooks return的东西在函数的最外层
  return [data, loading, error]
}