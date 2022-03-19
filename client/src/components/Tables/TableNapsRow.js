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
import { toast } from "react-toastify";
import { WithPermissions } from "..";
import { Actions, Resources } from "../../lib/helpers/constants";
import { formatDate } from "../../lib/helpers/utils";
import { NapService } from "../../lib/services";
import { Link } from "../Link";
import { UpdateNapForm } from "../NapForm";

export const TableNapsRow = (props) => {
  const { name, createdAt, location, status, updatedAt, id, mutate } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("green.700", "white");

  const getNap = async () => {
    try {
      const { data } = await NapService.one(id);
    } catch (error) {
      for (const err of error.errors) {
        toast.error(err.message);
      }
    }
  };

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <Text fontSize="sm" color="gray.500" fontWeight="normal">
              {name}
            </Text>
            <Text
              fontSize="sm"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {location}
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
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <WithPermissions action={Actions.read} resource={Resources.nap}>
              <Link href={`/naps/${id}`}>
                <Button p="0px" bg="transparent" variant="no-hover">
                  <Text
                    fontSize="md"
                    color="gray.400"
                    fontWeight="bold"
                    cursor="pointer"
                  >
                    Ver
                  </Text>
                </Button>
              </Link>
            </WithPermissions>

            <WithPermissions action={Actions.update} resource={Resources.nap}>
              <Button
                p="0px"
                bg="transparent"
                variant="no-hover"
                onClick={onOpen}
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
                  <ModalHeader>Editar NAP</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <UpdateNapForm
                      nap={props}
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
