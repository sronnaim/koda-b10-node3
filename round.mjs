import { start } from "./game.mjs";
import { askUntilValid } from "./question.mjs";
import { validateNumber } from "./utils.mjs";

async function askDiff() {
  console.log("\nPlease select the difficulty level:\n1. Easy (10 attempts)\n2. Medium (5 attempts)\n3. Hard (3 attempts)");

  return await askUntilValid("Enter your choice:", (answer) => {
    try {
      const n = validateNumber(answer);

      if (n < 1 || n > 3) return "Please enter a number between 1 to 3.";
    } catch {
      return `${answer} is not a valid option. Please enter a number between 1 to 3.`;
    }
  });
}

export async function playRound(min, max) {
  const diff = await askDiff();

  switch (diff) {
    case 1:
      await start(10, min, max);
      break;

    case 2:
      await start(5, min, max);
      break;

    case 3:
      await start(3, min, max);
      break;
  }
}
