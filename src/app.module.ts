import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PlayersModule } from './players/players.module.js';
import { TeamsModule } from './teams/teams.module.js';
import { TournamentsModule } from './tournaments/tournaments.module.js';

@Module({
  imports: [PlayersModule, TeamsModule, TournamentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
