import run from "aocrunner";

const parseInput = (rawInput: string): number[] => rawInput.split('\n').map(item => Number(item));

const calculateIncreases = (input: number[]) => {
  let last: number | undefined = undefined;
  let increases = 0;

  for (const current of input) {
    if (last && last < current) {
      increases += 1;
    }

    last = current;
  }

  return increases;
}

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  return calculateIncreases(input);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const windows: number[] = [];

  for (const index in input) {
    const numIndex = Number(index);

    windows.push(input.slice(numIndex, numIndex + 3).reduce((prev, num) => prev + num));
  }

  return calculateIncreases(windows);
};

run({
  part1: {
    tests: [
      {
        input: `
          100
          102
          104
          103
          182
          167
          200
        `,
        expected: 4,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          199
          200
          208
          210
          200
          207
          240
          269
        `,
        expected: 3,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
