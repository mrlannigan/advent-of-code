import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n');

type CountBitFrequencyResult = {
  frequency: Map<number, number>;
  filter: Map<number, string[]>;
};

type CountBitOnlyFrequencyResult = Pick<CountBitFrequencyResult, 'frequency'>;

enum RatingType {
  oxygen,
  c02scrubber,
}

export function countBitFreq(
  input: string[],
  bitPos: number,
  filter: true,
): CountBitFrequencyResult;
export function countBitFreq(
  input: string[],
  bitPos: number,
  filter?: false,
): CountBitOnlyFrequencyResult;
export function countBitFreq(
  input: string[],
  bitPos: number,
  filter = false,
): CountBitFrequencyResult | CountBitOnlyFrequencyResult {
  const resultMap: Map<number, number> = new Map();
  const resultFilter: Map<number, string[]> = new Map();

  for (const row of input) {
    const bit = Number(row[bitPos]);

    resultMap.set(bit, (resultMap.get(bit) ?? 0) + 1);

    if (filter) {
      const curFilter = resultFilter.get(bit) ?? [];
      curFilter.push(row);
      resultFilter.set(bit, curFilter);
    }
  }

  return {
    frequency: resultMap,
    filter: resultFilter,
  };
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const colCount = input[0].length;
  let gammaRate = 0;
  let epsilonRate = 0;

  for (let curColumn = 0; curColumn < colCount; curColumn += 1) {
    const { frequency } = countBitFreq(input, curColumn);

    const onBitCount = frequency.get(1) ?? 0;
    const offBitCount = frequency.get(0) ?? 0;

    // doesn't account for if counts are the same.

    const shift = colCount - curColumn - 1;

    if (onBitCount > offBitCount) {
      gammaRate = gammaRate + (1 << shift);
      epsilonRate = epsilonRate + (0 << shift);
    } else {
      // offBit < onBit
      gammaRate = gammaRate + (0 << shift);
      epsilonRate = epsilonRate + (1 << shift);
    }
  }

  return gammaRate * epsilonRate;
};

const findRating = (
  input: string[],
  ratingType: RatingType,
  bitPos = 0,
): number => {
  const { frequency, filter } = countBitFreq(input, bitPos, true);

  const onBitCount = frequency.get(1) ?? 0;
  const offBitCount = frequency.get(0) ?? 0;

  let targetBit: number = 0;

  if (onBitCount === offBitCount) {
    targetBit = 1;
  } else {
    targetBit = onBitCount > offBitCount ? 1 : 0;
  }

  if (ratingType === RatingType.c02scrubber) {
    targetBit ^= 1;
  }

  const newInput = filter.get(targetBit) ?? [];

  if (newInput.length === 1 || bitPos + 1 === input[0].length) {
    return parseInt(newInput[0], 2);
  }

  return findRating(newInput, ratingType, bitPos + 1);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return (
    findRating(input, RatingType.oxygen) *
    findRating(input, RatingType.c02scrubber)
  );
};

run({
  part1: {
    tests: [
      {
        input: `
          00100
          11110
          10110
          10111
          10101
          01111
          00111
          11100
          10000
          11001
          00010
          01010
        `,
        expected: 198,
      },
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
