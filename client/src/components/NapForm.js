import { Button, Stack } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from ".";
import { handleFormError } from "../lib/helpers/utils";
import { NapService } from "../lib/services";

export const NewNapForm = ({ onClose, mutate }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const { data } = await NapService.save(values);
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
        <Input
          type="text"
          name="name"
          placeholder="UPS A01"
          label="Nombre"
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
          placeholder="Ubicación ####"
          label="Ubicación"
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
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

export const UpdateNapForm = ({ nap, onClose, mutate }) => {
  const { name, location, id } = nap;
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const { data } = await NapService.update(values, id);
      toast.success("Modificado con éxito");
      onClose();
      mutate();
    } catch (error) {
      handleFormError(error, setError);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Input
          type="text"
          defaultValue={name}
          name="name"
          placeholder="UPS A01"
          label="Nombre"
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
          }}
        />

        <Input
          type="text"
          defaultValue={location}
          name="location"
          placeholder="Ubicación ####"
          label="Ubicación"
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 3, message: "Escriba al menos 3 caracteres" },
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
