import { Telnet } from "telnet-client";

const connection = new Telnet();

connection.on("data", function (data: Buffer) {
  console.log(">", data.toString("utf-8"));
});

// login when connected
connection.on("connect", function () {
  console.log("Telnet connected!");
  connection.write("zte\r\n");
  connection.write("zte\r\n");
});

connection.on("ready", function (prompt) {
  console.log(prompt);
  connection.write("write\r\n");
  connection.write(
    "file upload cfg-startup startrun.sav ftp ip 192.168.108.12 user ftpserver password ftpserver\r\n"
  );
});

connection.on("failedlogin", function (err) {
  console.log("failed login\n", err);
});

connection.on("timeout", function () {
  console.log("socket timeout!");
  connection.end();
});

connection.on("close", function () {
  console.log("Telnet connection closed");
});

export { connection };
