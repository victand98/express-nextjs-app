import useSWR from "swr";
import fetcher from "../helpers/fetcher";

export const useBackups = (fallbackData) => {
  const backups = useSWR("/backup", fetcher, { fallbackData });
  return backups;
};
