import useSWR from "swr";
import fetcher from "../helpers/fetcher";

export const useNaps = (fallbackData) => {
  const naps = useSWR("/nap", fetcher, { fallbackData });
  return naps;
};

export const useNap = (id, fallbackData) => {
  const nap = useSWR(`/nap/${id}`, fetcher, { fallbackData });
  return nap;
};
