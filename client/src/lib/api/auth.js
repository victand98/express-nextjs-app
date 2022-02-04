import useSWRImmutable from "swr/immutable";
import fetcher from "../helpers/fetcher";

export const usePermissions = (fallbackData) => {
  const permissions = useSWRImmutable("/auth/current/permissions", fetcher, {
    fallbackData,
  });
  return permissions;
};
