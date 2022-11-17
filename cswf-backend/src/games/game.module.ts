import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameSchema } from './game.schema';
import { GameService } from './game.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Game', schema: GameSchema }])],
    controllers: [GameController],
    providers: [GameService],
    exports: [GameService],
})
export class GameModule { }