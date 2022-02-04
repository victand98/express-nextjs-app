import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../helpers/errors/not-authorized-error";
import { Resources } from "../helpers/types";
import { Resource, RolesAttrs } from "../models";

export const authorization =
  (resource: Resources) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const foundResource = await Resource.findOne({
        name: resource,
        "roles.role": req.currentUser?.role,
      }).select({
        roles: {
          $elemMatch: {
            role: req.currentUser?.role,
          },
        },
      });
      if (!foundResource) throw new NotAuthorizedError();

      const allow = isAllowed(foundResource.roles[0], req.method);
      if (allow) next();
      else throw new NotAuthorizedError();
    } catch (error) {
      return next(error);
    }
  };

const isAllowed = (permissions: RolesAttrs, method: string): boolean => {
  let allow = false;

  switch (method) {
    case "GET":
      allow = permissions.read;
      break;
    case "POST":
      allow = permissions.create;
      break;
    case "PUT":
      allow = permissions.update;
      break;
    case "DELETE":
      allow = permissions.delete;
      break;
    default:
      break;
  }

  return allow;
};
