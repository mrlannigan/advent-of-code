import re
from util import get_day

MAX_CUBE_COLORS = {
  'red': 12,
  'green': 13,
  'blue': 14
}

class Pull:
  colors = dict()
  is_possible = True
  failed_pull = None

  def __init__(self, input: str) -> None:
    for color_pulled in input.split(','):
      num_pulled_str, color = color_pulled.strip().split(' ')
      num_pulled = int(num_pulled_str)
      self.colors[color] = num_pulled

      if self.is_possible == True and num_pulled > MAX_CUBE_COLORS[color]:
        self.is_possible = False
        self.failed_pull = (color, num_pulled)

def parse_game(game_line: str):
  game_id = 0
  pulls = list()
  
  if match := re.search("^Game ([0-9]+): (.+)", game_line, re.IGNORECASE):
    game_id = int(match.group(1))
    pulls = list(map(Pull, match.group(2).split(';')))
    is_possible = len([pull for pull in pulls if pull.is_possible == False]) == 0
    return (game_id, pulls, is_possible)
  else:
    return (0, list(), True)

def compute_input(data: str):
  game_id_total = 0
  for game_line in data.splitlines():
    game_id, _, is_possible = parse_game(game_line)
    if is_possible:
      game_id_total += game_id

  return game_id_total


if __name__ == "__main__":
  print(f'Sum: {compute_input(get_day(2023, 2))}')