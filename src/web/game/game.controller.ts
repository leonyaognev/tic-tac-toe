import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { type UUID } from 'crypto';
import type { PostGameDTO } from './game.dto';
import type GameService from 'src/domain/game.service.interface';
import PostMapper from './game.mapper';
import { CellType } from 'src/constants';

@Controller('game')
export default class GameController {
  constructor(
    @Inject('GameService') private readonly gameService: GameService,
  ) {}

  @Post(':id')
  async tick(
    @Param('id') id: UUID,
    @Body() DTO: PostGameDTO,
  ): Promise<PostGameDTO> {
    let game = PostMapper.toDomain(DTO);

    let validate: boolean;
    try {
      validate = await this.gameService.validateGame(game);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'NotFound') {
        throw new NotFoundException(`Game with id ${id} not found`);
      } else {
        throw err;
      }
    }

    if (validate) {
      if (this.gameService.isGameOver(game) === CellType.crosses) {
        return PostMapper.toDTO(game, 'win');
      } else if (this.gameService.isGameOver(game) === CellType.zeros) {
        return PostMapper.toDTO(game, 'lose');
      }

      game = await this.gameService.calculateNextMove(game);
    }

    return PostMapper.toDTO(game);
  }

  @Get()
  async newGame() {
    const game = await this.gameService.newGame();
    return PostMapper.toDTO(game);
  }
}
