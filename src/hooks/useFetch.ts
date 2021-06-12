import { AxiosRequestConfig } from "axios";
import assign from "lodash/assign";
import { useCallback, useState } from "react";

const useFetch = (
  endpoint: (_: AxiosRequestConfig | undefined) => any,
  { paginated, limit } = { paginated: false, limit: 15 }
) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const onRequest = useCallback(
    async (config?: AxiosRequestConfig) => {
      try {
        let defaultConfig = paginated
          ? { params: { limit, offset: limit * page } }
          : {};
        setLoading(true);
        setPage(page + 1);
        const { data: serverData } = await endpoint(
          assign(defaultConfig, config)
        );
        const { results } = serverData || {};
        if (results) setData((prevData) => [...prevData, ...results]);
        setLoading(false);
      } catch (_) {
        setLoading(false);
      }
    },
    [page]
  );

  const onRefresh = useCallback(async (config?: AxiosRequestConfig) => {
    try {
      let defaultConfig = paginated ? { params: { limit } } : {};
      setPage(2);
      setLoading(true);
      const { data: serverData } = await endpoint(
        assign(defaultConfig, config)
      );
      const { results } = serverData || {};
      if (results) setData(results);
      setLoading(false);
    } catch (_) {
      setLoading(false);
    }
  }, []);

  return { data, loading, page, setData, setLoading, onRequest, onRefresh };
};

export default useFetch;
