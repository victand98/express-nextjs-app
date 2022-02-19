import { Telnet } from "telnet-client";

class TelnetWrapper {
  private _connection?: Telnet;

  get connection() {
    if (!this._connection) return new Telnet();
    return this._connection;
  }

  connect(): Promise<void> {
    const params = {
      host: "192.168.20.80",
      port: 23,
      shellPrompt: "",
      loginPrompt: /Username[: ]*$/i,
      passwordPrompt: /Password: /i,
    };

    this.connection.on("data", (data: Buffer) => {
      console.log(">", data.toString("utf-8"));
    });

    this.connection.on("close", () => {
      console.log("Telnet connection closed");
    });

    return new Promise((resolve, reject) => {
      this.connection.connect(params).catch((err) => {
        console.log("[TELNET ERROR CONNECTION]", err);
        reject();
      });

      this.connection.on("connect", () => {
        console.log("Telnet connected!");
        this.connection.write("zte\r\n");
        this.connection.write("zte\r\n");
      });

      this.connection.on("ready", (prompt) => {
        console.log(prompt);
        resolve();
      });

      this.connection.on("failedlogin", (err) => {
        console.log("failed login\n", err);
        reject();
      });

      this.connection.on("timeout", () => {
        console.log("socket timeout!");
        this.connection.end();
        reject();
      });
    });
  }
}

export const telnetWrapper = new TelnetWrapper();

// const connection = new Telnet();

// const connectTelnet = async () => {
//   const params = {
//     host: "192.168.20.80",
//     port: 23,
//     shellPrompt: "",
//     loginPrompt: /Username[: ]*$/i,
//     passwordPrompt: /Password: /i,
//   };
//   await connection.connect(params);
// };

// connection.on("data", function (data: Buffer) {
//   console.log(">", data.toString("utf-8"));
// });

// // login when connected
// connection.on("connect", function () {
//   console.log("Telnet connected!");
//   connection.write("zte\r\n");
//   connection.write("zte\r\n");
// });

// connection.on("ready", function (prompt) {
//   console.log(prompt);
//   connection.write("write\r\n");
//   connection.write(
//     "file upload cfg-startup startrun.sav ftp ip 192.168.108.12 user ftpserver password ftpserver\r\n"
//   );
// });

// connection.on("failedlogin", function (err) {
//   console.log("failed login\n", err);
// });

// connection.on("timeout", function () {
//   console.log("socket timeout!");
//   connection.end();
// });

// connection.on("close", function () {
//   console.log("Telnet connection closed");
// });

// export { connection, connectTelnet };
