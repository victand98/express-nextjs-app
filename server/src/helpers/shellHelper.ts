import child_process from "node:child_process";
import { promisify } from "util";
const exec = promisify(child_process.exec);

export const execShell = (cmd: string) => exec(cmd);

export const execSeries = async (cmd: string[]) => {
  const cmdLine = cmd.shift();

  if (cmdLine) {
    const { stdout } = await execShell(cmdLine);
    console.log("stdout", stdout);
  }
  if (cmd.length) execSeries(cmd);
  else return;
};
