import React from "react";
import { useRouter } from "next/router";
import { Stack, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from ".";
import { AuthService } from "../lib/services";
import { useAuthContext } from "../context/AuthContext";

export const LoginForm = () => {
  const router = useRouter();
  const { mutatePermissions } = useAuthContext();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      await AuthService.login(values);
      mutatePermissions();
      const returnUrl = router.query.returnUrl || "/";
      router.push(returnUrl);
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
          type="email"
          name="email"
          bg={"blue.10"}
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
          bg={"blue.10"}
          placeholder="***************"
          label="Contraseña"
          errors={errors}
          register={register}
          rules={{
            required: "El campo es requerido",
            minLength: { value: 4, message: "Escriba al menos 4 caracteres" },
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
            Ingresar
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
