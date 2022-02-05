import Image from "next/image";
import {
  Collapse,
  Stack,
  Text,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { BsArrowsCollapse } from "react-icons/bs";
import { Card, CardBody, CardHeader } from "../components";
import { DashboardLayout } from "../layouts";
import OltImage from "../assets/img/olt.jpg";

const Home = () => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader
        title="Especificaciones"
        action={
          <IconButton
            variant="outline"
            icon={<BsArrowsCollapse />}
            onClick={onToggle}
            aria-label="Expandir/Contraer"
          />
        }
      />
      <Collapse in={isOpen}>
        <CardBody>
          <Image src={OltImage} alt="olt" priority layout="responsive" />

          <Stack direction={"row"} justify={"center"} spacing={6} mt={"1rem"}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>Marca</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                ZTE
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>Modelo</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                C320
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>IP</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                192.168.20.80
              </Text>
            </Stack>
          </Stack>
        </CardBody>
      </Collapse>
    </Card>
  );
};

Home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Home;
