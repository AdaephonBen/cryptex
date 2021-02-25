import { AxiosAuth, AxiosAPIProtected } from "./index";

export const RegisterAPI = async (
  email_id: string,
  username: string,
  password: string
) => {
  return await AxiosAuth.post("register", {
    email: email_id,
    username: username,
    password: password,
  });
};

export const LoginAPI = async (email_id: string, password: string) => {
  return await AxiosAuth.post("login", {
    email: email_id,
    password: password,
  });
};

export const GetCurrentUserAPI = async () => {
  return await AxiosAPIProtected.get("get-current-user");
};
