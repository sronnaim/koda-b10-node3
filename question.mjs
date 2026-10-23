import { stdin, stdout } from "node:process";
import readline from "node:readline/promises";

export async function askUntilValid(question, validation) {
  while (true) {
    const rl = readline.createInterface({ input: stdin, output: stdout });

    const input = await rl.question(`\n${question}\n> `);
    rl.close();

    const answer = input.trim();

    const invalidMsg = validation(answer);

    if (invalidMsg) {
      console.log(invalidMsg);
      continue;
    };

    return answer;
  }
}
