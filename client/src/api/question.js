import fetchProtected from "./auth";

const api_url = process.env.REACT_APP_API_URL;

export const GetQuestion = async () => {
  return await fetchProtected("GET", `${api_url}question`);
};
