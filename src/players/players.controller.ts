import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { PlayersService } from './players.service.js';
import { CreatePlayerDto } from './dto/create-player.dto.js';

@Controller('players')
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @Post()
  create(@Body() body: CreatePlayerDto) {
    return this.playersService.create(
      body.name,
      body.surname,
      body.teamId,
    );
  }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { name: string; surname: string },
  ) {
    return this.playersService.update(
      Number(id),
      body.name,
      body.surname,
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.playersService.delete(Number(id));
  }
}