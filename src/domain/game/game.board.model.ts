import { CellType } from 'src/constants';

export default class Board {
  constructor(
    public size: number = 3,
    public grid: Array<Array<number>> = Array.from({ length: this.size }, () =>
      new Array<number>(this.size).fill(CellType.zeros),
    ),
  ) {}

  checkWinner(): number {
    const size: number = this.grid.length;
    const lines: number[][] = [];

    for (let i = 0; i < size; i++) {
      lines.push(this.grid[i].slice());
    }

    for (let j = 0; j < size; j++) {
      const col: number[] = [];
      for (let i = 0; i < size; i++) {
        col.push(this.grid[i][j]);
      }
      lines.push(col);
    }

    const mainDiag: number[] = [];
    const antiDiag: number[] = [];

    for (let i = 0; i < size; i++) {
      mainDiag.push(this.grid[i][i]);
      antiDiag.push(this.grid[i][size - 1 - i]);
    }

    lines.push(mainDiag, antiDiag);

    let result: number = CellType.empty;
    for (const line of lines) {
      result = line.every((cell) => cell === CellType.zeros)
        ? CellType.zeros
        : CellType.crosses;
      result = line.every((cell) => cell === CellType.crosses)
        ? CellType.crosses
        : CellType.zeros;
    }

    return result;
  }
}
