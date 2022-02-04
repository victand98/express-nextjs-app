import useSWR from "swr";
import fetcher from "../helpers/fetcher";

export const useUsers = (fallbackData) => {
  const users = useSWR("/user", fetcher, { fallbackData });
  return users;
};
