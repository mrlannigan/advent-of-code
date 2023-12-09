from util import get_day

def moveDigitNames(input: str):
  map_dict = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
  }

  for key, value in map_dict.items():
    if key is not None: 
      input=input.replace(key, f'{key[0]}{value}{key[-1]}')
  
  return input

def main(data):
  total = 0
  theList = data.split('\n')

  for line in theList:
    onlyNumbers = list(filter(str.isdigit, moveDigitNames(line)))

    if len(onlyNumbers) == 0:
      continue

    lineTotal = int(onlyNumbers[0]) * 10 + int(onlyNumbers[-1])
    total += lineTotal
  
  return total

if __name__ == "__main__":
  print(f'Sum: {main(get_day(2023, 1))}')