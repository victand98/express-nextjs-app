import { Button, Stack } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input, Select } from ".";
import { PlanOptions } from "../lib/helpers/constants";
import { handleFormError } from "../lib/helpers/utils";
import { EquipmentService } from "../lib/services";
import { NumberInput } from "./Input";

export const NewEquipmentForm = ({ users, onClose, mutate, nap }) => {
  const usersOptions = users.map((user) => ({
    value: user.id,
    label: `${user.firstName} ${user.lastName}`,
  }));

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const onSubmit = async (values) => {
    try {
      values.nap = nap.id;
      const { data } = await EquipmentService.save(values);
      toast.success("Guardado con éxito");
      onClose();
      mutate();
    } catch (error) {
      handleFormError(error, setError);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <NumberInput
          step={1}
          min={1}
          precision={0}
          name="number"
          label="Número"
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            min: { value: 1, message: "El valor mínimo es 1" },
          }}
        />

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
          placeholder=".1.1"
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
          placeholder=".1.1"
          label="IP"
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
          }}
        />

        <Select
          placeholder="Seleccione un Plan"
          name="plan"
          label="Plan"
          errors={errors}
          register={register}
          options={PlanOptions}
          rules={{
            required: "El campo es requerido",
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
  const { brand, model, type, serial, vlan, ip, number, plan, user, id } =
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
        <NumberInput
          step={1}
          min={1}
          precision={0}
          name="number"
          label="Número"
          errors={errors}
          register={register}
          defaultValue={number}
          readOnly
          rules={{
            required: "El campo es requerido",
            min: { value: 1, message: "El valor mínimo es 1" },
          }}
        />

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
          readOnly
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
          readOnly
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
          placeholder=".1.1"
          label="VLAN"
          defaultValue={vlan}
          readOnly
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
          placeholder=".1.1"
          label="IP"
          defaultValue={ip}
          readOnly
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
          }}
        />

        <Select
          placeholder="Seleccione un Plan"
          name="plan"
          label="Plan"
          errors={errors}
          register={register}
          options={PlanOptions}
          defaultValue={plan}
          isDisabled
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
