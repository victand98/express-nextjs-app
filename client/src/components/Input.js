import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as InputUI,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as NumberInputUI,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React from "react";

export const Input = ({ name, label, register, rules, errors, ...rest }) => {
  return (
    <FormControl id={name} isInvalid={errors[name]}>
      <FormLabel>{label}</FormLabel>
      <InputUI {...rest} {...(register && register(name, rules))} />

      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};

export const NumberInput = ({
  name,
  label,
  register,
  rules,
  errors,
  ...rest
}) => {
  return (
    <FormControl id={name} isInvalid={errors[name]}>
      <FormLabel>{label}</FormLabel>
      <NumberInputUI {...rest}>
        <NumberInputField {...(register && register(name, rules))} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInputUI>

      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};
