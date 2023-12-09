from day01 import main

def test_part1():
  assert main("""1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet""") == 142

def test_part2():
  assert main("""two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen""") == 281
