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
import { toast } from "react-toastify";
import { UpdateEquipmentForm, WithPermissions } from "..";
import { Actions, Resources } from "../../lib/helpers/constants";
import { formatDate, toastErrors } from "../../lib/helpers/utils";
import { EquipmentService } from "../../lib/services";

export const TableEquipmentsRow = (props) => {
  const {
    id,
    brand,
    model,
    type,
    serial,
    vlan,
    ip,
    location,
    user,
    status,
    createdAt,
    updatedAt,
    users,
    mutate,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("red.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const removeEquipment = async () => {
    try {
      const { data } = await EquipmentService.remove(id);
      toast.success("Eliminado con éxito");
      mutate();
    } catch (error) {
      toastErrors(error);
    }
  };

  return (
    <Tr>
      <Td minWidth={{ sm: "150px" }} pl="0px">
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
        <Badge
          bg={status ? "green.400" : bgStatus}
          color={status ? "white" : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {status ? "Activo" : "Eliminado"}
        </Badge>
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
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <WithPermissions
              action={Actions.delete}
              resource={Resources.equipment}
            >
              <Button
                p="0px"
                bg="transparent"
                variant="no-hover"
                onClick={removeEquipment}
                disabled={!status}
              >
                <Text
                  fontSize="md"
                  color="red.400"
                  fontWeight="bold"
                  cursor="pointer"
                >
                  Eliminar
                </Text>
              </Button>
            </WithPermissions>

            <WithPermissions
              action={Actions.update}
              resource={Resources.equipment}
            >
              <Button
                p="0px"
                bg="transparent"
                variant="no-hover"
                onClick={onOpen}
                disabled={!status}
              >
                <Text
                  fontSize="md"
                  color="gray.400"
                  fontWeight="bold"
                  cursor="pointer"
                >
                  Editar
                </Text>
              </Button>

              <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
              >
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
          </Flex>
        </Flex>
      </Td>
    </Tr>
  );
};
