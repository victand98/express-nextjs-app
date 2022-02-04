import React from "react";
import { Stack, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input, Select } from ".";
import { EquipmentService } from "../lib/services";

export const NewEquipmentForm = ({ users, onClose, mutate }) => {
  const usersOptions = users.map((user) => ({
    value: user.id,
    label: `${user.firstName} ${user.lastName}`,
  }));

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const { data } = await EquipmentService.save(values);
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
          name="brand"
          placeholder="Marca A"
          label="Marca"
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
          }}
        />

        <Input
          type="text"
          name="model"
          placeholder="Modelo 123"
          label="Modelo"
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
          }}
        />

        <Input
          type="text"
          name="type"
          placeholder="Tipo M"
          label="Tipo"
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
          }}
        />

        <Input
          type="text"
          name="serial"
          placeholder="XX-XXX-XXXX"
          label="Serial"
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
          }}
        />

        <Input
          type="text"
          name="vlan"
          placeholder="192.168.1.1"
          label="VLAN"
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
          }}
        />

        <Input
          type="text"
          name="ip"
          placeholder="192.168.1.1"
          label="IP"
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
          }}
        />

        <Input
          type="text"
          name="location"
          placeholder="Edificio 12"
          label="Ubicación"
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
          }}
        />

        <Select
          placeholder="Seleccione un Usuario"
          name="user"
          label="Usuario"
          errors={errors}
          register={register}
          options={usersOptions}
          rules={{
            setValueAs: (value) => value || null,
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

export const UpdateEquipmentForm = ({ equipment, users, onClose, mutate }) => {
  const { brand, model, type, serial, vlan, ip, location, user, id } =
    equipment;

  const usersOptions = users.map((user) => ({
    value: user.id,
    label: `${user.firstName} ${user.lastName}`,
  }));

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const { data } = await EquipmentService.update(values, id);
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
        <Input
          type="text"
          name="brand"
          placeholder="Marca A"
          label="Marca"
          defaultValue={brand}
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
          }}
        />
        <Input
          type="text"
          name="model"
          placeholder="Modelo 123"
          label="Modelo"
          defaultValue={model}
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
          }}
        />
        <Input
          type="text"
          name="type"
          placeholder="Tipo M"
          label="Tipo"
          defaultValue={type}
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
          }}
        />
        <Input
          type="text"
          name="serial"
          placeholder="XX-XXX-XXXX"
          label="Serial"
          defaultValue={serial}
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
          }}
        />
        <Input
          type="text"
          name="vlan"
          placeholder="192.168.1.1"
          label="VLAN"
          defaultValue={vlan}
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
          }}
        />
        <Input
          type="text"
          name="ip"
          placeholder="192.168.1.1"
          label="IP"
          defaultValue={ip}
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
          }}
        />
        <Input
          type="text"
          name="location"
          placeholder="Edificio 12"
          label="Ubicación"
          defaultValue={location}
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
          }}
        />
        <Select
          placeholder="Seleccione un Usuario"
          name="user"
          label="Usuario"
          defaultValue={user?.id}
          errors={errors}
          register={register}
          options={usersOptions}
          rules={{
            setValueAs: (value) => value || null,
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
