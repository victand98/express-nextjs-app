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
import {
  Card,
  CardBody,
  CardHeader,
  NewNapForm,
  TableNapsRow,
  WithPermissions,
} from "../../components";
import { DashboardLayout } from "../../layouts";
import { useNaps } from "../../lib/api/naps";
import { Actions, Resources } from "../../lib/helpers/constants";

const Naps = ({ naps }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, mutate } = useNaps(naps);

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader
        title="Lista de NAP's"
        action={
          <WithPermissions action={Actions.create} resource={Resources.nap}>
            <Stack spacing={2} direction="row" align="center">
              <Button
                variant="outline"
                minW="20"
                leftIcon={<HiOutlineDocumentAdd />}
                onClick={onOpen}
              >
                Nueva
              </Button>
            </Stack>
          </WithPermissions>
        }
      />

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nueva NAP</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <NewNapForm onClose={onClose} mutate={mutate} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              <Th pl="0px" color="gray.400">
                Nap
              </Th>
              <Th color="gray.400">Historial</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row) => {
              return <TableNapsRow {...row} key={row.id} mutate={mutate} />;
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

Naps.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

Naps.getInitialProps = async (context, client) => {
  const naps = await client.get(`/nap/`);

  return { naps: naps.data };
};

export default Naps;
