import { useAuthContext } from "../context/AuthContext";

export const WithPermissions = ({ children, action, resource }) => {
  const { permissions } = useAuthContext();

  if (hasPermission(permissions, action, resource)) return children;
  return null;
};

// Function that checks if the current user has permission to access a certain component.
const hasPermission = (userPermissions = [], action, resource) => {
  const foundResource = userPermissions.find(
    (userPermission) => userPermission.name === resource
  );
  if (foundResource) return foundResource.roles[0][action];
  return false;
};

export const canRenderItem = (userPermissions = [], resource) =>
  !resource ||
  userPermissions.some((userPermission) => userPermission.name === resource);
