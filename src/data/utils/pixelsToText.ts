export function pixelsToText(coords: Array<{ x: number; y: number }>) {
  // 1. Find bounds of the grid
  const minX = Math.min(...coords.map((c) => c.x));
  const maxX = Math.max(...coords.map((c) => c.x));
  const minY = Math.min(...coords.map((c) => c.y));
  const maxY = Math.max(...coords.map((c) => c.y));

  // 2. Build a 2D grid (pixels ON/OFF)
  const grid = [];
  for (let y = minY; y <= maxY; y++) {
    const row = [];
    for (let x = minX; x <= maxX; x++) {
      row.push(coords.some((c) => c.x === x && c.y === y) ? '█' : ' ');
    }
    grid.push(row);
  }

  // 3. Split grid into columns for each character
  //    (look for vertical gaps of all spaces)
  const chars = [];
  let currentChar = [];

  for (let col = 0; col < grid[0].length; col++) {
    const column = grid.map((row) => row[col]);
    if (column.every((cell) => cell === ' ')) {
      if (currentChar.length > 0) {
        chars.push(currentChar);
        currentChar = [];
      }
    } else {
      currentChar.push(column);
    }
  }
  if (currentChar.length > 0) chars.push(currentChar);

  // 4. Convert each char grid into a string key
  function charToKey(charCols: string[][]) {
    return charCols.map((c) => c.flat(2).join('')).join('');
  }

  // 5. Define a lookup (you’ll need to build this manually once!)
  const dir: { [key: string]: string } = {
    ' █     █████████       █': '1',
    ' █    ███    █ ██   █  ██  █   █ ██    █': '2',
    ' █    █ █  █   ██  █   █ ██ ███ ': '3',
    '██████       █     █████     █  ': '4',
    '████  █ █  █   ██  █   ██   ███ ': '5',
    '  █████  █  █  ██  █   ██  █   █ █  ███ ': '6',
    '█     ███   ██  █ ██    ██      ': '7',
    ' ██ ███ █  █   ██  █   ██  █   █ ██ ███ ': '8',
    ' ██     █  █    █   █   █   █    ███████': '9',
    '  ████   █    █ █      █ █    █   ████  ': '0',
  };

  const lookup = (str: string) => dir[str] ?? '?';

  // 6. Recognize characters
  return chars.map(charToKey).map(lookup).join('');
}
