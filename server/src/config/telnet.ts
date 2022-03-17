import { SendOptions, Telnet } from "telnet-client";
import log from "../helpers/logger";

class TelnetWrapper {
  private _connection?: Telnet;

  get connection() {
    if (!this._connection) this._connection = new Telnet();
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

    return new Promise((resolve, reject) => {
      this.connection.connect(params).catch((err) => {
        console.log("[TELNET ERROR CONNECTION]", err);
        reject();
      });

      this.connection.on("connect", () => {
        log.info("Telnet Connected!\n");
        this.connection.write("zte\r\n");
        this.connection.write("zte\r\n", { waitFor: /strong/i });
        resolve();
      });
    });

    // return this.connection.connect(params);
  }

  login(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection.on("failedlogin", (err) => {
        log.error(`Failed login\n${err}`);
        reject();
      });

      this.connection.on("ready", (prompt) => {
        log.info(prompt);
        resolve();
      });
    });
  }

  write(cmd: string, options?: SendOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection.on("data", (data: Buffer) => {
        log.info(`\n${data.toString("utf-8")}`);
      });

      this.connection.write(cmd, options, (err, value) => {
        if (err) reject();
        log.info(`\n[RESPONSE]>\n${value}`);
        resolve();
      });

      this.connection.on("timeout", () => {
        console.log("socket timeout!");
        this.connection.end();
        reject();
      });
    });
  }

  closeConnection(): Promise<void> {
    this.connection.on("close", () => {
      log.info("Telnet connection closed");
    });
    return this.connection.end();
  }
}

export const telnetWrapper = new TelnetWrapper();
