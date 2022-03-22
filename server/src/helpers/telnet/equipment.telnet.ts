import { telnetWrapper } from "../../config/telnet";
import { Plans } from "../types";

const registerONU = async (number: number, type: string, serial: string) => {
  await telnetWrapper.connect();
  await telnetWrapper.login();
  await telnetWrapper.write(`configure terminal\r\n`);
  await telnetWrapper.write(`interface gpon-olt_1/1/1\r\n`);
  await telnetWrapper.write(`onu ${number} type ${type} sn ${serial}\r\n`);
  await telnetWrapper.write(`exit\r\n`);
};

const setPlan = async (number: number, plan: Plans, vlan: string) => {
  await telnetWrapper.write(`configure terminal\r\n`);
  await telnetWrapper.write(`interface gpon-onu_1/1/1:${number}\r\n`);

  switch (plan) {
    case Plans.plan10M:
      await telnetWrapper.write(`tcont 3 profile ${plan}\r\n`);
      await telnetWrapper.write(`gemport 1 tcont 3\r\n`);
    case Plans.plan15M:
      await telnetWrapper.write(`tcont 4 profile ${plan}\r\n`);
      await telnetWrapper.write(`gemport 1 tcont 4\r\n`);
    case Plans.plan20M:
      await telnetWrapper.write(`tcont 5 profile ${plan}\r\n`);
      await telnetWrapper.write(`gemport 1 tcont 5\r\n`);
  }

  await telnetWrapper.write(
    `service-port 1 vport 1 user-vlan ${vlan} vlan ${vlan}\r\n`
  );
  await telnetWrapper.write(`exit\r\n`);
};

const addService = async (number: number, vlan: string, ip: string) => {
  await telnetWrapper.write(`configure terminal\r\n`);
  await telnetWrapper.write(`pon-onu-mng gpon-onu_1/1/1:${number}\r\n`);
  await telnetWrapper.write(`service INTERNET gemport 1 vlan ${vlan}\r\n`);
  await telnetWrapper.write(
    `wan-ip 1 mode static ip-profile static100 ip-address ${ip} mask 255.255.255.0 vlan-profile VLAN100\r\n`
  );
  await telnetWrapper.write(`dhcp-ip ethuni eth_0/1 from-onu\r\n`);
  await telnetWrapper.write(
    `vlan port eth_0/1 mode tag vlan ${vlan} pri 7\r\n`
  );
  await telnetWrapper.write(`exit\r\n`);
  await telnetWrapper.write(`exit\r\n`);
  await telnetWrapper.write(`write\r\n`);
  await telnetWrapper.closeConnection();
};

const removeEquipment = async (number: number) => {
  await telnetWrapper.connect();
  await telnetWrapper.login();
  await telnetWrapper.write(`configure terminal\r\n`);
  await telnetWrapper.write(`interface gpon-olt_1/1/1\r\n`);
  await telnetWrapper.write(`no onu ${number}\r\n`);
  await telnetWrapper.write(`exit\r\n`);
  await telnetWrapper.closeConnection();
};

export const equipmentTelnet = {
  registerONU,
  setPlan,
  addService,
  removeEquipment,
};
