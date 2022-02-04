import useSWR from "swr";
import fetcher from "../helpers/fetcher";

export const useEquipments = (fallbackData) => {
  const equipments = useSWR("/equipment", fetcher, { fallbackData });
  return equipments;
};
