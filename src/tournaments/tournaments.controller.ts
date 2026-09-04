import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { TournamentsService } from './tournaments.service.js';

@Controller('tournaments')
export class TournamentsController {
    constructor(private tournamentsService: TournamentsService) { }

    @Post()
    create(@Body() body: { name: string }) {
        return this.tournamentsService.create(body.name);
    }

    @Post(':tournamentId/players/:playerId')
    addPlayer(
        @Param('tournamentId') tournamentId: string,
        @Param('playerId') playerId: string,
    ) {
        return this.tournamentsService.addPlayer(
            Number(tournamentId),
            Number(playerId),
        );
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tournamentsService.findOne(Number(id));
    }
}