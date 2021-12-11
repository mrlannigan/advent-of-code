import run from "aocrunner";

enum Command {
  forward = "forward",
  up = "up",
  down = "down",
}

type CommandRow = {
  command: Command;
  units: number;
};

type Submarine = {
  horizontalPosition: number;
  depth: number;
  aim?: number;
};

const parseInput = (rawInput: string): CommandRow[] =>
  rawInput.split("\n").map((row) => {
    const rowSplit = row.split(" ");

    return {
      command: Command[rowSplit[0]],
      units: Number(rowSplit[1]),
    };
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const sub: Submarine = {
    horizontalPosition: 0,
    depth: 0,
  };

  for (const commandRow of input) {
    switch (commandRow.command) {
      case Command.forward:
        sub.horizontalPosition += commandRow.units;
        break;
      case Command.down:
        sub.depth += commandRow.units;
        break;
      case Command.up:
        sub.depth -= commandRow.units;
        break;
    }
  }

  return sub.depth * sub.horizontalPosition;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const sub: Submarine = {
    horizontalPosition: 0,
    depth: 0,
    aim: 0,
  };

  for (const commandRow of input) {
    switch (commandRow.command) {
      case Command.forward:
        sub.horizontalPosition += commandRow.units;
        sub.depth += sub.aim * commandRow.units;
        break;
      case Command.down:
        sub.aim += commandRow.units;
        break;
      case Command.up:
        sub.aim -= commandRow.units;
        break;
    }
  }

  return sub.depth * sub.horizontalPosition;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
