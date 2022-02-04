import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as SelectUI,
} from "@chakra-ui/react";
import React from "react";

export const Select = ({
  name,
  label,
  register,
  rules,
  errors,
  options,
  ...rest
}) => {
  return (
    <FormControl id={name} isInvalid={errors[name]}>
      <FormLabel>{label}</FormLabel>

      <SelectUI {...rest} {...(register && register(name, rules))}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </SelectUI>

      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};
