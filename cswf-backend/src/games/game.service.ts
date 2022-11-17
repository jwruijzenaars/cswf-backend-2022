import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import Game from './game';

@Injectable()
export class GameService {
    getGames() {
        console.log('getGames called');
        Game.find({}, (err, games) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                return games;
            }
        });
    }

    getGame(id: string) {
        console.log('getGame called');
        Game.findOne({ _id: id }, (err, game) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                return game;
            }
        })
    }

    createGame(newGame) {
        console.log('createGame called');
        const game = new Game(newGame);
        game.save((err, game) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                return game;
            }
        });
    }

    updateGame(id: string, updatedGame) {
        console.log('updateGame called');
        Game.findOneAndUpdate({ _id: id }, updatedGame).exec((err, game) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                return game;
            }
        });
    }

    deleteGame(id: string) {
        console.log('deleteGame called');
        Game.findOneAndDelete({ _id: id }).exec((err, game) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                return game;
            }
        });
    }
}
