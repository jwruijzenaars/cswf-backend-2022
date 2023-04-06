import { Injectable, Scope } from '@nestjs/common';
import { Model } from 'mongoose';
import { Game } from './game.schema';
import { InjectModel } from '@nestjs/mongoose';


@Injectable({ scope: Scope.DEFAULT })
export class GameService {
    constructor(@InjectModel('Game') private gameModel: Model<Game>) { };
    async getGames(): Promise<Game[]> {
        console.log('getGames called');
        return await this.gameModel.find({}).then((res) => {
            return res;
        });
    };

    async getGame(id: string): Promise<Game> {
        console.log('getGame called');
        return this.gameModel.findOne({ _id: id }).then((res) => {
            console.log('game found: ', res);
            return res;
        });
    };

    async createGame(newGame): Promise<Game> {
        console.log('createGame called');
        return this.gameModel.create(newGame).then((res) => {
            console.log('game created: ', res);
            return res;
        });
    };

    async updateGame(id: string, updatedGame): Promise<Game> {
        console.log('updateGame called');
        return this.gameModel.findOneAndUpdate({ _id: id }, updatedGame).then((res) => {
            console.log('game updated: ', res);
            return res;
        });
    };

    async deleteGame(id: string): Promise<Game> {
        console.log('deleteGame called');
        return this.gameModel.findOneAndDelete({ _id: id }).then((res) => {
            console.log('game deleted: ', res);
            return res;
        });
    };
};
