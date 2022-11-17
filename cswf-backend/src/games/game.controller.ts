import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { GameService } from './game.service';

@Controller()
export class GameController {
    constructor(private readonly appService: GameService) { }

    @Get()
    getGames() {
        return this.appService.getGames();
    }

    @Get(':id')
    getGame(@Param() params) {
        return this.appService.getGame(params.id);
    }

    @Post()
    createGame(@Req() req) {
        return this.appService.createGame(req.body);
    }

    @Put(':id')
    updateGame(@Param() params, @Req() req) {
        return this.appService.updateGame(params.id, req.body);
    }

    @Delete(':id')
    deleteGame(@Param() params) {
        return this.appService.deleteGame(params.id);
    }
}
