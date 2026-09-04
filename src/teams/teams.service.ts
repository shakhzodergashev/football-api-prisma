import { Injectable } from '@nestjs/common';
import { db } from '../prisma/db.js';

@Injectable()
export class TeamsService {
    async create(name: string){
        return db.orm.public.Team.create({
            name,
        });
    }

    async findOne(id: number) {
        return db.orm.public.Team
            .where({ id })
            .include('players')
            .first();
    }

    async findAll() {
        return db.orm.public.Team
            .include('players')
            .all();
    }

    async update(id: number, name: string) {
        return db.orm.public.Team
            .where({ id })
            .update({
                name,
            });
    }

    async delete(id: number) {
        return db.orm.public.Team
            .where({ id })
            .delete();
    }
}
