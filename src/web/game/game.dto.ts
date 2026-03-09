import { UUID } from 'crypto';

export interface PostGameDTO {
  id: UUID;
  size: number;
  grid: Array<Array<number>>;
  status?: 'win' | 'lose' | 'ongoing';
}
