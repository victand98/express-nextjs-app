import React from "react";
import { Stack, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input, Select, Switch } from ".";
import { UserService } from "../lib/services";
import { useAuthContext } from "../context/AuthContext";

export const NewUserForm = ({ roles, onClose, mutate }) => {
  const rolesOptions = roles.map((role) => ({
    value: role.id,
    label: role.name,
  }));

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const { data } = await UserService.save(values);
      toast.success("Guardado con éxito");
      onClose();
      mutate();
    } catch (error) {
      for (const err of error.errors) {
        toast.error(err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Input
          type="text"
          name="firstName"
          placeholder="Hugo"
          label="Nombre"
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
            maxLength: {
              value: 16,
              message: "Escriba no más de 16 caracteres",
            },
          }}
        />

        <Input
          type="text"
          name="lastName"
          placeholder="Robles"
          label="Apellido"
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
          }}
        />

        <Input
          type="text"
          name="dni"
          placeholder="10 dígitos"
          label="Cédula"
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 10, message: "Escriba al menos 10 caracteres" },
          }}
        />

        <Input
          type="email"
          name="email"
          placeholder="usuario@correo.com"
          label="Correo Electrónico"
          errors={errors}
          register={register}
          rules={{
            pattern: {
              value:
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
              message: "El correo no es válido",
            },
            required: "El campo es requerido",
          }}
        />

        <Input
          type="password"
          name="password"
          placeholder="***************"
          label="Contraseña"
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 4, message: "Escriba al menos 4 caracteres" },
          }}
        />

        <Select
          placeholder="Seleccione un Rol"
          name="role"
          label="Rol"
          errors={errors}
          register={register}
          options={rolesOptions}
          rules={{
            required: "El campo es requerido",
          }}
        />

        <Stack spacing={10}>
          <Button
            type="submit"
            isLoading={isSubmitting}
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Guardar
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export const UpdateUserForm = ({ user, roles, onClose, mutate }) => {
  const { currentUser } = useAuthContext();
  const { dni, email, firstName, id, lastName, role, status } = user;

  const rolesOptions = roles.map((role) => ({
    value: role.id,
    label: role.name,
  }));

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const { data } = await UserService.update(values, id);
      toast.success("Modificado con éxito");
      onClose();
      mutate();
    } catch (error) {
      for (const err of error.errors) {
        toast.error(err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Switch
          name="status"
          label="Estado"
          defaultChecked={status}
          errors={errors}
          register={register}
        />

        <Input
          type="text"
          name="firstName"
          placeholder="Hugo"
          defaultValue={firstName}
          label="Nombre"
          errors={errors}
          register={register}
          readOnly
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
            maxLength: {
              value: 16,
              message: "Escriba no más de 16 caracteres",
            },
          }}
        />

        <Input
          type="text"
          name="lastName"
          placeholder="Robles"
          defaultValue={lastName}
          label="Apellido"
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
          }}
        />

        <Input
          type="text"
          name="dni"
          placeholder="10 dígitos"
          label="Cédula"
          defaultValue={dni}
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 10, message: "Escriba al menos 10 caracteres" },
          }}
        />

        <Input
          type="email"
          name="email"
          placeholder="usuario@correo.com"
          label="Correo Electrónico"
          defaultValue={email}
          errors={errors}
          register={register}
          rules={{
            pattern: {
              value:
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
              message: "El correo no es válido",
            },
            required: "El campo es requerido",
          }}
        />

        {/* <Input
          type="password"
          name="password"
          placeholder="***************"
          label="Contraseña"
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 4, message: "Escriba al menos 4 caracteres" },
          }}
        /> */}

        <Select
          placeholder="Seleccione un Rol"
          name="role"
          label="Rol"
          defaultValue={role.id}
          errors={errors}
          register={register}
          options={rolesOptions}
          isDisabled={currentUser.id === id}
          rules={{
            required: "El campo es requerido",
          }}
        />

        <Stack spacing={10}>
          <Button
            type="submit"
            isLoading={isSubmitting}
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Modificar
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
