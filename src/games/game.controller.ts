import { Controller, Delete, Get, Param, Post, Put, Req, Inject } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './game.schema';

@Controller('games')
export class GameController {
    constructor(private readonly gameService: GameService) { }

    @Get()
    async getGames(): Promise<Game[]> {
        return await this.gameService.getGames();
    }

    @Get(':id')
    async getGame(@Param() params): Promise<Game> {
        return await this.gameService.getGame(params.id);
    }

    @Post()
    async createGame(@Req() req) {
        return await this.gameService.createGame(req.body);
    }

    @Put(':id')
    async updateGame(@Param() params, @Req() req): Promise<Game> {
        return await this.gameService.updateGame(params.id, req.body);
    }

    @Delete(':id')
    async deleteGame(@Param() params): Promise<Game> {
        return await this.gameService.deleteGame(params.id);
    }

    @Post(':id/review')
    async addReview(@Param() params, @Req() req) {
        // Also add review to user, call authService here

        return await this.gameService.addReview(params.id, req.body);
    }
}
