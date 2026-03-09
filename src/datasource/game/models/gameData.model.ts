import { UUID } from 'crypto';
import { BoardData } from './boardData.model';

export type GameData = {
  id: UUID;
  boardData: BoardData;
};
