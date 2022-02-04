import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Switch as SwitchUI,
} from "@chakra-ui/react";
import React from "react";

export const Switch = ({ name, label, register, rules, errors, ...rest }) => {
  return (
    <FormControl
      display="flex"
      alignItems="center"
      id={name}
      isInvalid={errors[name]}
    >
      <FormLabel htmlFor={name} mb="0">
        {label}
      </FormLabel>
      <SwitchUI id={name} {...rest} {...(register && register(name, rules))} />

      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};
