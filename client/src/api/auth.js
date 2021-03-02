// use-api.js
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const useApi = (url, options = {}) => {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState({
    error: null,
    loading: true,
    data: null,
  });
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { ...fetchOptions } = options;
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUDIENCE,
        });
        const res = await fetch(url, {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            // Add the Authorization header to the existing headers
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setState({
          ...state,
          data: await res.json(),
          error: null,
          loading: false,
        });
      } catch (error) {
        setState({
          ...state,
          error,
          loading: false,
        });
      }
    })();
  }, [refreshIndex]);

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1),
  };
};

export const callApi = async (accessToken, url, options = {}) => {
  const { fetchOptions } = options;
  try {
    const res = await fetch(url, {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if (res.status == 400) {
      return null;
    }
    return json;
  } catch (e) {
    return null;
  }
};
