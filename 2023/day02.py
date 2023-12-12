import re
from util import get_day

MAX_CUBE_COLORS = {
  'red': 12,
  'green': 13,
  'blue': 14
}

class Pull:

  def __init__(self, input: str) -> None:
    self.colors: dict[str, int] = dict()
    self.is_possible = True
    self.failed_pull = None

    for color_pulled in input.split(','):
      num_pulled_str, color = color_pulled.strip().split(' ')
      num_pulled = int(num_pulled_str)
      self.colors[color] = num_pulled

      if self.is_possible == True and num_pulled > MAX_CUBE_COLORS[color]:
        self.is_possible = False
        self.failed_pull = (color, num_pulled)

class Game:

  def __init__(self, game_line: str):
    self.id = 0
    self.pulls: list[Pull] = list()
    self.is_possible = True
    self.max_colors: dict[str, int] = dict()

    if match := re.search("^Game ([0-9]+): (.+)", game_line, re.IGNORECASE):
      self.id = int(match.group(1))
      for pull_line in match.group(2).split(';'):
        pull = Pull(pull_line)
        for color in pull.colors.keys():
          if color not in self.max_colors or self.max_colors[color] < pull.colors[color]:
            self.max_colors[color] = pull.colors[color]
        self.pulls.append(pull)
      
    self.is_possible = self.determine_is_possible()
    
  
  def determine_is_possible(self):
    return len([pull for pull in self.pulls if pull.is_possible == False]) == 0

  def get_max_cube_power(self):
    total = 0
    for color_value in self.max_colors.values():
      if total == 0:
        total = color_value
      else:
        total *= color_value
    return total

def compute_input_game_ids(data: str):
  game_id_total = 0
  for game_line in data.splitlines():
    game = Game(game_line)
    if game.is_possible:
      game_id_total += game.id

  return game_id_total

def compute_input_game_powers(data: str):
  game_total = 0
  for game_line in data.splitlines():
    game = Game(game_line)
    game_total += game.get_max_cube_power()

  return game_total

if __name__ == "__main__":
  day_data = get_day(2023, 2)
  print(f'Game Ids Sum: {compute_input_game_ids(day_data)}')
  print(f'Powers Sum: {compute_input_game_powers(day_data)}')