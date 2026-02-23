export function parseCommand(userInput) {
  if (!userInput) return { command: undefined, subcommand: undefined, args: [] };

  const regex = /[^\s"]+|"([^"]*)"/g;
  const parts = [];
  let match;
  while ((match = regex.exec(userInput)) !== null) {
    parts.push(match[1] ? match[1] : match[0]);
  }

  return {
    command: parts[0] || undefined,
    subcommand: parts[1] || undefined,
    args: parts.slice(2)
  };
}