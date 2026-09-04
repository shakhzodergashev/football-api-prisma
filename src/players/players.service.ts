import { Injectable } from '@nestjs/common';
import { db } from '../prisma/db.js';

@Injectable()
export class PlayersService {
    async create(
        name: string,
        surname: string,
        teamId?: number,
    ) {
        return db.orm.public.Player.create({
            name,
            surname,
            teamId,
        });
    }

    async findAll() {
        return db.orm.public.Player.all();
    }

    /*
    async findOne(id: number) {
        console.log('SEARCHING FOR:', id);

        const player = await db.orm.public.Player
            .where((player) => player.id.eq(id))
            .first();

        console.log('RESULT:', player);

        return player;
    }
    */
   
    async update(id: number, name: string, surname: string) {
        return db.orm.public.Player
            .where({ id })
            .update({
                name,
                surname,
            });
    }

    async delete(id: number) {
        return db.orm.public.Player
            .where({ id })
            .delete();
    }

    async findOne(id: number) {
        return db.orm.public.Player
            .where({ id })
            .include('tournaments', (playerTournament) =>
                playerTournament.include('tournament'),
            )
            .first();
    }
}