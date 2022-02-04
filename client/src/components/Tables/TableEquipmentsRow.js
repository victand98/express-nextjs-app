import {
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
import { UpdateEquipmentForm, WithPermissions } from "..";
import { Actions, Resources } from "../../lib/helpers/constants";
import { formatDate } from "../../lib/helpers/utils";

export const TableEquipmentsRow = (props) => {
  const {
    brand,
    model,
    type,
    serial,
    vlan,
    ip,
    location,
    user,
    createdAt,
    updatedAt,
    users,
    mutate,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("gray.700", "white");

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
              {brand}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {model}
            </Text>
            <Text fontSize="sm" color="green.400" fontWeight="normal">
              <strong>{type}</strong> | {serial}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            VLAN: {vlan}
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            IP: {ip}
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            {location}
          </Text>
        </Flex>
      </Td>

      <Td>
        {user ? (
          <Flex direction="column">
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {user.firstName}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {user.lastName}
            </Text>
          </Flex>
        ) : (
          <Flex direction="column">
            <Text fontSize="md" color="gray.400" fontWeight="bold">
              Sin Asignar
            </Text>
          </Flex>
        )}
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
        <WithPermissions action={Actions.update} resource={Resources.equipment}>
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
              <ModalHeader>Editar Equipo</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <UpdateEquipmentForm
                  equipment={props}
                  users={users}
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
