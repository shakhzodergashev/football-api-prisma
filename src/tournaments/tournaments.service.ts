import { Injectable } from '@nestjs/common';
import { db } from '../prisma/db.js';

@Injectable()
export class TournamentsService {
    async create(name: string) {
        return db.orm.public.Tournament.create({
            name,
        });
    }

    async addPlayer(tournamentId: number, playerId: number) {
        return db.orm.public.PlayerTournament.create({
            tournamentId,
            playerId,
        });
    }

    async findOne(id: number) {
        return db.orm.public.Tournament
            .where({ id })
            .include('players', (playerTournament) =>
                playerTournament.include('player'),
            )
            .first();
    }
}