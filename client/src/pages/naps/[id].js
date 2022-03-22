import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { MdOutlineArrowBack } from "react-icons/md";
import {
  Card,
  CardBody,
  CardHeader,
  Link,
  NewEquipmentForm,
  TableEquipmentsRow,
  WithPermissions,
} from "../../components";
import { DashboardLayout } from "../../layouts";
import { useNap } from "../../lib/api/naps";
import { Actions, Resources } from "../../lib/helpers/constants";

const Equipments = ({ napData, users }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, mutate } = useNap(napData.nap.id, napData);

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader
        title="Lista de Equipos"
        subtitle={napData.nap.name}
        action={
          <Stack spacing={2} direction="row" align="center">
            <Link href="/naps">
              <Button
                variant="link"
                minW="20"
                leftIcon={<MdOutlineArrowBack />}
              >
                Regresar
              </Button>
            </Link>

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
          </Stack>
        }
      />

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nuevo Equipo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <NewEquipmentForm
              users={users}
              onClose={onClose}
              mutate={mutate}
              nap={data.nap}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              <Th pl="0px" color="gray.400">
                N°
              </Th>
              <Th pl="0px" color="gray.400">
                Equipo
              </Th>
              <Th color="gray.400">Estado</Th>
              <Th color="gray.400">Detalles</Th>
              <Th color="gray.400">Usuario</Th>
              <Th color="gray.400">Historial</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.equipments.map((row) => {
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
  const { id } = context.query;

  const [nap, users] = await Promise.all([
    client.get(`/nap/${id}`),
    client.get(`/user/`),
  ]);

  return {
    napData: nap.data,
    users: users.data,
  };
};

export default Equipments;
