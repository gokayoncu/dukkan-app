import {useEffect, useState} from 'react';
import axios from 'axios';
function useFetch(url) {
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };
  return {data, loading, error};
}

export default useFetch;
