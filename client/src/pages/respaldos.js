import {
  Card,
  CardBody,
  CardHeader,
  NewBackupForm,
  TableBackupsRow,
  WithPermissions,
} from "../components";
import { DashboardLayout } from "../layouts";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { useBackups } from "../lib/api/backups";
import { Actions, Resources } from "../lib/helpers/constants";

const Backups = ({ backups }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, mutate } = useBackups(backups);

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader
        title="Lista de Respaldos"
        action={
          <WithPermissions action={Actions.create} resource={Resources.backup}>
            <Button
              variant="outline"
              minW="20"
              leftIcon={<HiOutlineDocumentAdd />}
              onClick={onOpen}
            >
              Nuevo
            </Button>
          </WithPermissions>
        }
      />

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nuevo Respaldo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <NewBackupForm onClose={onClose} mutate={mutate} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              <Th pl="0px" color="gray.400">
                Respaldo
              </Th>
              <Th color="gray.400">Historial</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row) => {
              return <TableBackupsRow {...row} key={row.id} />;
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

Backups.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

Backups.getInitialProps = async (context, client) => {
  const backups = await client.get(`/backup/`);

  return { backups: backups.data };
};

export default Backups;
