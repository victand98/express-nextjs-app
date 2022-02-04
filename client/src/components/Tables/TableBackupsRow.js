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
import { UpdateBackupForm, WithPermissions } from "..";
import { Actions, Resources } from "../../lib/helpers/constants";
import { formatDate } from "../../lib/helpers/utils";

export const TableBackupsRow = (props) => {
  const { path, createdAt, updatedAt, mutate } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              Archivo
            </Text>
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {path}
            </Text>
          </Flex>
        </Flex>
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
        <WithPermissions action={Actions.read} resource={Resources.backup}>
          <Button p="0px" bg="transparent" variant="no-hover" onClick={onOpen}>
            <Text
              fontSize="md"
              color="gray.400"
              fontWeight="bold"
              cursor="pointer"
            >
              Ver
            </Text>
          </Button>
          {/* 
          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Editar Equipo</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <UpdateBackupForm
                  equipment={props}
                  users={users}
                  onClose={onClose}
                  mutate={mutate}
                />
              </ModalBody>
            </ModalContent>
          </Modal> */}
        </WithPermissions>
      </Td>
    </Tr>
  );
};
