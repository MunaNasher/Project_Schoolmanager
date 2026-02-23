import promptSync from 'prompt-sync';
import chalk from 'chalk';
import { parseCommand } from './command-parser.js';
import { handleTraineeCommand } from './traineeCommands.js';
import { handleCourseCommand } from './courseCommands.js';

const prompt = promptSync();

// meaage for start
console.log(chalk.green.bold('🎓 School Management CLI Started'));

// handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log(chalk.yellow('\nGoodbye!'));
  process.exit();
});

// Short help function
function showHelp() {
  const commands = [
    'TRAINEE ADD <FirstName> <LastName>',
    'TRAINEE UPDATE <ID> <FirstName?> <LastName?>',
    'TRAINEE DELETE <ID>',
    'TRAINEE GET <ID>',
    'TRAINEE LIST',
    'COURSE ADD <Name> <StartDate>',
    'COURSE UPDATE <ID> <Name?> <StartDate?>',
    'COURSE DELETE <ID>',
    'COURSE JOIN <CourseID> <TraineeID>',
    'COURSE LEAVE <CourseID> <TraineeID>',
    'COURSE GET <ID>',
    'COURSE LIST'
  ];

  console.log(chalk.green('\nAvailable commands:'));
  commands.forEach(cmd => console.log(chalk.cyan(cmd)));
  console.log(); // empty line
}

// loop for input
while (true) {
  const input = prompt('> ').trim();

  if (!input) continue;

  if (input.toUpperCase() === 'QUIT' || input.toLowerCase() === 'q') {
    console.log(chalk.yellow('Goodbye! 👋'));
    break;
  }

  if (input.toUpperCase() === 'HELP') {
    showHelp();
    continue;
  }

  const { command, subcommand, args } = parseCommand(input);

  if (!command) {
    console.log(chalk.red('Please enter a command!'));
    continue;
  }

  if (command.toUpperCase() === 'TRAINEE') {
    handleTraineeCommand(subcommand?.toUpperCase(), args);
  } else if (command.toUpperCase() === 'COURSE') {
    handleCourseCommand(subcommand?.toUpperCase(), args);
  } else {
    console.log(chalk.red('Unknown command. Type HELP to see all commands.'));
  }
}

