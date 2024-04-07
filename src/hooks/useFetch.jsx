import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";

const useFetch = (url) => {
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("loading");
    setData(null);
    setError(null);

    fetchData(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong!");
      });
  }, [url]);

  return { loading, data, error };
};

export default useFetch;
