import { Controller, Body, Post, Param, Get, Patch, Delete } from '@nestjs/common';
import { TeamsService } from './teams.service.js';

@Controller('teams')
export class TeamsController {
    constructor(private teamsService: TeamsService) {}

    @Post()
    create(@Body() body: {name: string}) {
        return this.teamsService.create(body.name);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.teamsService.findOne(Number(id));
    }

    @Get()
    findAll() {
        return this.teamsService.findAll();
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() body: {name: string},
    ) {
        return this.teamsService.update(
            Number(id),
            body.name,
        );
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.teamsService.delete(Number(id));
    }
}
