import { Controller, Get } from '@nestjs/common';
import { GameService } from './game.service';

@Controller()
export class GameController {
    constructor(private readonly appService: GameService) { }

    @Get()
    getGames(): string {
        return this.appService.getHello();
    }
}
