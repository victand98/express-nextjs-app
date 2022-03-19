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
import {
  Card,
  CardBody,
  CardHeader,
  NewUserForm,
  TableUsersRow,
  WithPermissions,
} from "../components";
import { DashboardLayout } from "../layouts";
import { useUsers } from "../lib/api/users";
import { Actions, Resources } from "../lib/helpers/constants";

const Users = ({ users, roles }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, mutate } = useUsers(users);

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader
        title="Lista de Usuarios"
        action={
          <WithPermissions action={Actions.create} resource={Resources.users}>
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
          <ModalHeader>Nuevo Usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <NewUserForm roles={roles} onClose={onClose} mutate={mutate} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              <Th pl="0px" color="gray.400">
                Usuario
              </Th>
              <Th color="gray.400">Rol</Th>
              <Th color="gray.400">Estado</Th>
              <Th color="gray.400">Historial</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row) => {
              return (
                <TableUsersRow
                  {...row}
                  key={row.id}
                  mutate={mutate}
                  roles={roles}
                />
              );
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

Users.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

Users.getInitialProps = async (context, client) => {
  const [users, roles] = await Promise.all([
    client.get(`/user/`),
    client.get(`/role/`),
  ]);

  return { users: users.data, roles: roles.data };
};

export default Users;
