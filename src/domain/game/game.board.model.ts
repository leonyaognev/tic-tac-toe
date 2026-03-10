import { CellType } from 'src/constants';

export default class Board {
  public grid: number[][];

  constructor(
    public size: number = 3,
    grid?: number[][],
  ) {
    if (grid) {
      this.grid = grid;
    } else {
      this.grid = Array.from({ length: size }, () =>
        new Array<number>(size).fill(CellType.empty),
      );
    }
  }

  checkWinner(): number | null {
    const size = this.grid.length;
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

    for (const line of lines) {
      if (line.every((cell) => cell === CellType.zeros)) return CellType.zeros;
      if (line.every((cell) => cell === CellType.crosses))
        return CellType.crosses;
    }

    if (this.grid.some((row) => row.includes(CellType.empty))) return null;

    return CellType.empty;
  }
}
