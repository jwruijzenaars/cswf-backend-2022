import { Controller, Delete, Get, Param, Post, Put, Req, Inject, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './game.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('games')
export class GameController {
    constructor(private readonly gameService: GameService, private readonly userService: UserService) { }

    @Get()
    async getGames(): Promise<Game[]> {
        return await this.gameService.getGames();
    }

    @Get(':id')
    async getGame(@Param() params): Promise<Game> {
        return await this.gameService.getGame(params.id);
    }

    @Post()
    @UseGuards(AuthGuard)
    async createGame(@Req() req) {
        return await this.gameService.createGame(req.body);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async updateGame(@Param() params, @Req() req): Promise<Game> {
        try {
            return await this.gameService.updateGame(params.id, req.body);
        } catch (error) {
            return error;
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteGame(@Param() params): Promise<Game> {
        return await this.gameService.deleteGame(params.id);
    }

    @Post(':id/review')
    @UseGuards(AuthGuard)
    async addReview(@Param() params, @Req() req) {
        return await this.userService.addReview(params.id, req.body, params.gameId);
    }
}
