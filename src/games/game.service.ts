import { Injectable, Scope } from '@nestjs/common';
import { Model } from 'mongoose';
import { Game } from './game.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './review.schema';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { Auth } from 'src/auth/auth.schema';


@Injectable({ scope: Scope.DEFAULT })
export class GameService {
    constructor(@InjectModel('Game') private gameModel: Model<Game>, private readonly neo4jService: Neo4jService, @InjectModel('Game') private userModel: Model<Auth>) { };
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
        const game = await this.gameModel.findOne({ _id: id });
        if (game.createdByUser != updatedGame.createdByUser) {
            return Promise.reject('You are not authorized to update this game');
        }

        return this.gameModel.findOneAndUpdate({ _id: id }, updatedGame).then((res) => {
            console.log('game updated: ', res);
            return res;
        });
    };

    async deleteGame(id: string): Promise<Game> {
        console.log('deleteGame called');
        return await this.gameModel.findOneAndDelete({ _id: id }).then(async (res) => {
            console.log('game deleted: ', res);

            await this.neo4jService.runQuery(
                `MATCH (a:User)-[r:WISHLIST]->(b:Game {id: $id}) DELETE r`,
                {
                    id: id,
                }
            );
            await this.neo4jService.runQuery(
                `MATCH (a:User)-[r:RECOMMENDED]->(b:Game {id: $id}) DELETE r`,
                {
                    id: id,
                }
            );
            await this.neo4jService.runQuery(
                `MATCH (a:User)-[r:OWNEDGAMES]->(b:Game {id: $id}) DELETE r`,
                {
                    id: id,
                }
            );

            await this.userModel.updateMany(
                { wishlist: id },
                { $pull: { wishlist: id } }
            );

            await this.userModel.updateMany(
                { recommended: id },
                { $pull: { recommended: id } }
            );

            await this.userModel.updateMany(
                { owned: id },
                { $pull: { owned: id } }
            );

            return res;
        });
    };
};
