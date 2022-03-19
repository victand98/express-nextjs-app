import { Button, Stack } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from ".";
import { BackupService } from "../lib/services";

export const NewBackupForm = ({ onClose, mutate }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("backupFile", values.backupFile[0]);

    try {
      const { data } = await BackupService.save(formData);
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
          type="file"
          name="backupFile"
          label="Archivo de respaldo"
          errors={errors}
          register={register}
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
