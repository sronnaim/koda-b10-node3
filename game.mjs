import { askUntilValid } from "./question.mjs";
import { validateNumber } from "./utils.mjs";
import { randomInt } from "node:crypto";

export async function start(attempt = 5, min = 1, max = 100) {
  const n = randomInt(min, max);

  if (attempt < 1) throw Error("Number of attempts must at be a whole number of at least 1.");

  for (let index = 0; index < attempt; index++) {
    const attemptLeft = attempt - index;
    console.log(`You have ${attemptLeft} left!`);

    const guess = await askGuess(min, max);
    const res = checkGuess(guess, n);

    switch (res) {
      case "less":
        console.log("Incorrect! The number is more than ", guess, ".");
        continue;

      case "more":
        console.log("Incorrect! The number is less than ", guess, ".");
        continue;
    }

    if (index === 0) {
      console.log("Congratulations! You guessed it right in the first try!");
      break;
    }

    console.log(`Congratulations! You guessed the correct number in ${index + 1} attempt.`);
    return;
  }

  console.log("Sorry, you ran out of guesses.");
}

function checkGuess(guess, number) {
  const g = validateNumber(guess);

  if (g < number) return "less";

  if (g > number) return "more";

  return "equal";
}

async function askGuess(min, max) {
  return await askUntilValid("Enter your guess:", (answer) => {
    try {
      const num = validateNumber(answer);

      if (num < min) return `Your guess cannot be less than ${min}.`;
      if (num > max) return `Your guess cannot be more than ${max}.`;
    } catch {
      return `${answer} is not a valid guess, please enter only a valid number between ${min} and ${max}.`;
    }
  });
}
