import os
import requests
from dotenv import load_dotenv

load_dotenv()

def get_day(year: int, day: int):
  response = requests.get(f'http://adventofcode.com/{year}/day/{day}/input', cookies={
    'session': os.getenv('AOC_SESSION')
  })
  return response.text