import { askUntilValid } from "./question.mjs";
import { playRound } from "./round.mjs";

async function main() {
  console.log("Welcome to the Number Guessing Game!");
  console.log("I'm thinking of a number between 1 and 100.");

  while (true) {
    await playRound(1, 100);

    const answer = await askUntilValid("Play again? (yes/y/no/n)", (answer) => {
      if (!["yes", "y", "no", "n"].includes(answer.toLowerCase())) return "Unknown answer";
    });

    if (["no", "n"].includes(answer.toLowerCase())) break;
  }

  console.log("Exiting the game...");
}

main()
  .catch(() => {
    console.log("Unexpected error happened");
    console.log("Exiting the game");
  });
