import { differenceInSeconds } from 'date-fns';

async function getUserInput(): Promise<number> {
  const inquirerModule = await import('inquirer');
  const res = await inquirerModule.default.prompt({
    name: "userInput",
    type: "number",
    message: "Please enter the amount of seconds:",
    validate: (input: number) => input > 0 || "Please enter a positive number."
  });
  return res.userInput;
}

function startTimer(duration: number) {
  const endTime = new Date(new Date().getTime() + duration * 1000); // Calculate the end time

  const interval = setInterval(() => {
    const currentTime = new Date();
    const timeDiff = differenceInSeconds(endTime, currentTime); // Calculate the time difference in seconds

    if (timeDiff <= 0) {
      console.log("Timer has expired");
      clearInterval(interval);
    } else {
      const min = Math.floor(timeDiff / 60);
      const sec = timeDiff % 60;
      console.clear();
      console.log(`Time left: ${min}:${sec < 10 ? '0' : ''}${sec}`);
    }
  }, 1000);
}

async function main() {
  const userInput = await getUserInput();
  startTimer(userInput);
}

main(); // Call the async function immediately
