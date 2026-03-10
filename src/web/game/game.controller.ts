import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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
import Game from 'src/domain/game/game.model';

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
      if (err instanceof Error && err.name === 'NotFoundError') {
        throw new NotFoundException(`Game with id ${id} not found`);
      } else {
        throw err;
      }
    }

    if (validate) {
      let gameOver = this.gameService.isGameOver(game);
      if (gameOver !== CellType.empty)
        if (gameOver === CellType.crosses) {
          return PostMapper.toDTO(game, 'win');
        } else if (gameOver === CellType.zeros) {
          return PostMapper.toDTO(game, 'lose');
        } else if (gameOver === CellType.empty) {
          return PostMapper.toDTO(game, 'draw');
        }

      game = await this.gameService.calculateNextMove(game);

      gameOver = this.gameService.isGameOver(game);
      if (gameOver !== CellType.empty)
        if (gameOver === CellType.crosses) {
          return PostMapper.toDTO(game, 'win');
        } else if (gameOver === CellType.zeros) {
          return PostMapper.toDTO(game, 'lose');
        } else if (gameOver === CellType.empty) {
          return PostMapper.toDTO(game, 'draw');
        }
    } else {
      throw new HttpException(`Invalid game data`, HttpStatus.BAD_REQUEST);
    }

    return PostMapper.toDTO(game, 'ongoing');
  }

  @Get()
  async newGame() {
    const game = await this.gameService.newGame();
    return PostMapper.toDTO(game);
  }

  @Get(':id')
  async getGame(@Param('id') id: UUID): Promise<PostGameDTO> {
    let game: Game;
    try {
      game = await this.gameService.getGame(id);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'NotFoundError') {
        throw new HttpException(
          `Game with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw err;
      }
    }
    return PostMapper.toDTO(game);
  }
}
