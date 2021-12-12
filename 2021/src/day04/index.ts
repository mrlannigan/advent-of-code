import run from 'aocrunner';

type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;

type BingoRow = Tuple<number, 5>;
type BingoCard = Tuple<BingoRow, 5>;

enum BingoLineType {
  row,
  column,
}

type ParsedOutput = {
  selections: number[];
  cards: BingoCard[];
};

const parseBingoRow = (rawRow: string): BingoRow => {
  return [
    Number(rawRow.slice(0, 2)),
    Number(rawRow.slice(3, 5)),
    Number(rawRow.slice(6, 8)),
    Number(rawRow.slice(9, 11)),
    Number(rawRow.slice(12, 14)),
  ];
};

const parseInput = (rawInput: string) => {
  const splitInput = rawInput.split('\n');
  const output: ParsedOutput = {
    selections: String(splitInput.shift()).split(',').map(Number),
    cards: [],
  };

  splitInput.shift(); // remove empty line

  while (splitInput.length) {
    const card: BingoCard = [
      parseBingoRow(String(splitInput.shift())),
      parseBingoRow(String(splitInput.shift())),
      parseBingoRow(String(splitInput.shift())),
      parseBingoRow(String(splitInput.shift())),
      parseBingoRow(String(splitInput.shift())),
    ];

    output.cards.push(card);

    splitInput.shift();
  }

  return output;
};

const checkBingoLine = (line: BingoRow, selected: number[]): boolean => {
  for (const bingoNumber of line) {
    if (selected.includes(bingoNumber) === false) {
      return false;
    }
  }

  return true;
};

const pullBingoLine = (
  card: BingoCard,
  type: BingoLineType,
  pos: number,
): BingoRow => {
  if (type === BingoLineType.row) {
    return card[pos];
  }

  return new Array<number>(5)
    .fill(0)
    .map((_val, index) => card[index][pos]) as BingoRow;
};

const checkCard = (card: BingoCard, selected: number[]): boolean => {
  for (let index = 0; index < 5; index += 1) {
    if (
      checkBingoLine(pullBingoLine(card, BingoLineType.row, index), selected) ||
      checkBingoLine(pullBingoLine(card, BingoLineType.column, index), selected)
    ) {
      return true;
    }
  }

  return false;
};

const calculateCard = (card: BingoCard, selected: number[]): number => {
  const lastNumber = selected.slice(-1).shift();
  const flatCard = flattenCard(card);

  const unmarkedNumbers = flatCard.reduce((final, value) => {
    if (selected.includes(value) === false) {
      return final + value;
    }

    return final;
  }, 0);

  return unmarkedNumbers * (lastNumber ?? 1);
};

const visualizeCard = (card: BingoCard, selected: number[]): string[][] => {
  const result: ReturnType<typeof visualizeCard> = card.map((row) => {
    return row.map((value) => {
      if (selected.includes(value)) {
        return 'xx';
      }

      if (value < 10) {
        return ` ${value}`;
      }

      return String(value);
    });
  });

  return result;
};

const flattenCard = (card: BingoCard): Tuple<number, 25> => {
  return card.flat() as Tuple<number, 25>;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const selected: number[] = [];

  for (const [index, curNumber] of Object.entries(input.selections)) {
    if (Number(index) < 5) {
      selected.push(curNumber);
      continue;
    }

    for (const card of input.cards) {
      if (checkCard(card, selected)) {
        return calculateCard(card, selected);
      }
    }

    selected.push(curNumber);
  }

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const selected: number[] = [];
  const matchedCards: { card: BingoCard; selected: number[] }[] = [];

  for (const [index, curNumber] of Object.entries(input.selections)) {
    if (Number(index) < 5) {
      selected.push(curNumber);
      continue;
    }

    if (input.cards.length === 0) {
      break;
    }

    const cardIndexesToRemove: number[] = [];

    for (const [cardIndex, card] of Object.entries(input.cards)) {
      if (checkCard(card, selected)) {
        matchedCards.push({
          card,
          selected: [...selected],
        });
        cardIndexesToRemove.push(Number(cardIndex));
      }
    }

    if (cardIndexesToRemove.length) {
      cardIndexesToRemove.reverse();

      for (const indexToRemove of cardIndexesToRemove) {
        input.cards.splice(indexToRemove, 1);
      }
    }

    selected.push(curNumber);
  }

  const lastCardMatch = matchedCards.slice(-1)[0];

  return calculateCard(lastCardMatch.card, lastCardMatch.selected);
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
