import {
  Badge,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Td,
  Text,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { UpdateUserForm, WithPermissions } from "..";
import { Actions, Resources } from "../../lib/helpers/constants";
import { formatDate } from "../../lib/helpers/utils";

export const TableUsersRow = (props) => {
  const {
    createdAt,
    dni,
    email,
    firstName,
    lastName,
    role,
    status,
    updatedAt,
    mutate,
    roles,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {firstName} {lastName}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {email}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {dni}
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            {role.name}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Badge
          bg={status ? "green.400" : bgStatus}
          color={status ? "white" : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {status ? "Activo" : "Inactivo"}
        </Badge>
      </Td>

      <Td>
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          Creado el
        </Text>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {formatDate(createdAt)}
        </Text>
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          Última actualización
        </Text>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {formatDate(updatedAt)}
        </Text>
      </Td>

      <Td>
        <WithPermissions action={Actions.update} resource={Resources.users}>
          <Button p="0px" bg="transparent" variant="no-hover" onClick={onOpen}>
            <Text
              fontSize="md"
              color="gray.400"
              fontWeight="bold"
              cursor="pointer"
            >
              Editar
            </Text>
          </Button>

          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Editar Usuario</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <UpdateUserForm
                  user={props}
                  roles={roles}
                  onClose={onClose}
                  mutate={mutate}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </WithPermissions>
      </Td>
    </Tr>
  );
};
