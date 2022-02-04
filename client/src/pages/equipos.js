import {
  Card,
  CardBody,
  CardHeader,
  NewEquipmentForm,
  TableEquipmentsRow,
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
import { useEquipments } from "../lib/api/equipments";
import { Actions, Resources } from "../lib/helpers/constants";

const Equipments = ({ equipments, users }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, mutate } = useEquipments(equipments);

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader
        title="Lista de Equipos"
        action={
          <WithPermissions
            action={Actions.create}
            resource={Resources.equipment}
          >
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
          <ModalHeader>Nuevo Equipo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <NewEquipmentForm users={users} onClose={onClose} mutate={mutate} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              <Th pl="0px" color="gray.400">
                Equipo
              </Th>
              <Th color="gray.400">Ubicación</Th>
              <Th color="gray.400">Usuario</Th>
              <Th color="gray.400">Historial</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row) => {
              return (
                <TableEquipmentsRow
                  {...row}
                  key={row.id}
                  mutate={mutate}
                  users={users}
                />
              );
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

Equipments.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

Equipments.getInitialProps = async (context, client) => {
  const [users, equipments] = await Promise.all([
    client.get(`/user/`),
    client.get(`/equipment/`),
  ]);

  return { users: users.data, equipments: equipments.data };
};

export default Equipments;
