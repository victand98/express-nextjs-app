import { Resource, Role, User } from "../models";
import { Roles } from "../helpers/types";
import { Password } from "../helpers/Password";
import { defaultResources } from "../helpers/constants";

const insertRoles = async () => {
  const roles = Object.values(Roles);
  console.log("Inserting Roles...");
  const rolesToInsert = roles.map((role) =>
    Role.findOneAndUpdate({ name: role }, { name: role }, { upsert: true })
  );
  await Promise.all(rolesToInsert);
  console.log("Roles inserted");
};

const insertAdmin = async () => {
  const adminRole = await Role.findOne({ name: Roles.administrator });
  const userAdmin = {
    firstName: "Super",
    lastName: "Administrador",
    dni: "0000000000",
    email: process.env.ADMIN_EMAIL,
    password: await Password.toHash(process.env.ADMIN_PASSWORD!),
    role: adminRole?.id,
  };
  console.log("Inserting Admin...");
  await User.findOneAndUpdate({ email: userAdmin.email }, userAdmin, {
    upsert: true,
  });
  console.log("Admin inserted");
};

const insertResources = async () => {
  const resources = defaultResources;
  const roles = await Role.find();

  const newResources = resources.map((resource) => {
    const resourceRoles = resource.roles.map((resourceRole) => {
      resourceRole.role = roles.find(
        (role) => role.name === resourceRole.role
      )?.id;
      return resourceRole;
    });
    resource.roles = resourceRoles;
    return resource;
  });

  console.log(`Inserting Resources...`);
  const resourcesToInsert = newResources.map((newResource) =>
    Resource.findOneAndUpdate({ name: newResource.name }, newResource, {
      upsert: true,
    })
  );
  await Promise.all(resourcesToInsert);
  console.log("Resources inserted");
};

const seeders = async () => {
  try {
    await insertRoles();
    await insertAdmin();
    await insertResources();
  } catch (error) {
    console.error(`An error occurred while saving the data: ${error}`);
  }
};

export { seeders };
