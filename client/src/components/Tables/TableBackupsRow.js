import React from "react";
import {
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import fileDownload from "js-file-download";
import { WithPermissions } from "..";
import { Actions, Resources } from "../../lib/helpers/constants";
import { formatDate } from "../../lib/helpers/utils";
import { BackupService } from "../../lib/services";
import { toast } from "react-toastify";

export const TableBackupsRow = (props) => {
  const { id, path, createdAt, updatedAt } = props;
  const textColor = useColorModeValue("gray.700", "white");

  const getBackup = async () => {
    try {
      const { data } = await BackupService.one(id);
      fileDownload(data, path);
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
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              Archivo
            </Text>
            <Text
              fontSize="sm"
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
          <Button
            p="0px"
            bg="transparent"
            variant="no-hover"
            onClick={getBackup}
          >
            <Text
              fontSize="md"
              color="gray.400"
              fontWeight="bold"
              cursor="pointer"
            >
              Descargar
            </Text>
          </Button>
        </WithPermissions>
      </Td>
    </Tr>
  );
};
