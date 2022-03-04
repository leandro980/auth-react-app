import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(async (api) => {
    setIsLoading(true);
    setError(null);
    let data = null;

    try {
      const response = await api();
      if (response.status !== 200) {
        setError(response.data.error.message);
      } else {
        data = response.data;
      }
    } catch (e) {
      setError("Ops si è verificato un errore inaspettato!");
    }

    setIsLoading(false);
    return data;
  }, []);

  return { isLoading, error, callApi };
};

export default useHttp;
