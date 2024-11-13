import { Injectable, Scope } from '@nestjs/common';
import { Model } from 'mongoose';
import { Auth } from '../auth/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { Review } from 'src/games/review.schema';
import { Game } from 'src/games/game.schema';


@Injectable({ scope: Scope.DEFAULT })
export class UserService {
    constructor(
        @InjectModel(Auth.name) private authModel: Model<Auth>,
        @InjectModel(Game.name) private gameModel: Model<Game>,
        private neo4jService: Neo4jService) { };

    getFriendsWishlist(id: any, friendId: any): any {
        throw new Error('Method not implemented.');
    }

    async addFriendRequest(id: string, friendId: string): Promise<Auth> {
        console.log('addFriendRequest called');
        return this.authModel.findOneAndUpdate({ _id: friendId }, { $push: { friendRequests: id } }).then((res) => {
            console.log('friend request added: ', res);

            this.neo4jService.runQuery(
                `MATCH (a:User {id: $id}), (b:User {id: $friendId}) CREATE (a)-[r:FRIEND_REQUEST]->(b) RETURN r`,
                {
                    id: id,
                    friendId: friendId,
                }
            );

            return res;
        });
    }

    async cancelFriendRequest(id: string, friendId: string): Promise<Auth> {
        console.log('cancelFriendRequest called');
        return this.authModel.findOneAndUpdate({ _id: friendId }, { $pull: { friendRequests: id } }).then((res) => {
            console.log('friend request cancelled: ', res);

            this.neo4jService.runQuery(
                `MATCH (a:User {id: $id})-[r:FRIEND_REQUEST]->(b:User {id: $friendId}) DELETE r`,
                {
                    id: id,
                    friendId: friendId,
                }
            );

            return res;
        });
    }

    async denyFriendRequest(id: string, friendId: string): Promise<Auth> {
        console.log('removeFriendRequest called');
        return this.authModel.findOneAndUpdate({ _id: id }, { $pull: { friendRequests: friendId } }).then((res) => {
            console.log('friend request denied: ', res);

            this.neo4jService.runQuery(
                `MATCH (a:User {id: $id})-[r:FRIEND_REQUEST]->(b:User {id: $friendId}) DELETE r`,
                {
                    id: id,
                    friendId: friendId,
                }
            );

            return res;
        });
    }

    async acceptFriendRequest(id: string, friendId: string): Promise<Auth> {
        console.log('acceptFriendRequest called');

        return this.authModel.findOneAndUpdate({ _id: id }, { $push: { friends: friendId } }).then((res) => {
            console.log('friend added: ', res);

            this.authModel.findOneAndUpdate({ _id: id }, { $pull: { friendRequests: friendId } }).then((res) => {
                console.log('friend request removed: ', res);
            });

            this.authModel.findOneAndUpdate({ _id: friendId }, { $push: { friends: id } }).then((res) => {
                console.log('friend added: ', res);
                return res;
            });

            this.neo4jService.runQuery(
                `MATCH (a:User {id: $id}), (b:User {id: $friendId}) CREATE (a)-[r:FRIENDS]->(b) RETURN r`,
                {
                    id: id,
                    friendId: friendId,
                }
            );

            return res;
        });
    }

    async removeFriend(id: string, friendId: string): Promise<Auth> {
        console.log('removeFriend called');
        return this.authModel.findOneAndUpdate({ _id: id }, { $pull: { friends: friendId } }).then((res) => {
            console.log('friend removed: ', res);

            this.authModel.findOneAndUpdate({ _id: friendId }, { $pull: { friends: id } }).then((res) => {
                console.log('friend removed: ', res);
            });

            this.neo4jService.runQuery(
                `MATCH (a:User {id: $id})-[r:FRIENDS]->(b:User {id: $friendId}) DELETE r`,
                {
                    id: id,
                    friendId: friendId,
                }
            );

            return res;
        });
    }

    async addOwnedGame(id: string, gameId: string): Promise<Auth> {
        console.log('addOwnedGame called');
        return this.authModel.findOneAndUpdate({ _id: id }, { $push: { ownedGames: gameId } }).then((res) => {
            console.log('owned game added: ', res);

            this.neo4jService.runQuery(
                `MATCH (a:User {id: $id}), (b:Game {id: $gameId}) CREATE (a)-[r:OWNEDGAMES]->(b) RETURN r`,
                {
                    id: id,
                    gameId: gameId,
                }
            );

            return res;
        });
    }

    async removeOwnedGame(id: string, gameId: string): Promise<Auth> {
        console.log('removeOwnedGame called');
        return this.authModel.findOneAndUpdate({ _id: id }, { $pull: { ownedGames: gameId } }).then((res) => {
            console.log('owned game removed: ', res);

            this.neo4jService.runQuery(
                `MATCH (a:User {id: $id})-[r:OWNEDGAMES]->(b:Game {id: $gameId}) DELETE r`,
                {
                    id: id,
                    gameId: gameId,
                }
            );

            return res;
        });
    }

    async addReview(id: string, review: Review, gameId: string): Promise<Auth> {
        console.log('addReview called');
        return this.authModel.findOneAndUpdate({ _id: id }, { $push: { reviews: review } }).then((res) => {
            console.log('review added: ', res);

            this.gameModel.findOneAndUpdate({ _id: gameId }, { $push: { reviews: review } }).then((res) => {
                console.log('review added: ', res);
            });

            this.neo4jService.runQuery(
                `MATCH (a:User {id: $id}), (b:Review {id: $reviewId}) CREATE (a)-[r:REVIEWS]->(b) RETURN r`,
                {
                    id: id,
                    reviewId: res.id,
                }
            );

            return res;
        });
    }

    async removeReview(id: string, reviewId: string, gameId: string): Promise<Auth> {
        console.log('removeReview called');
        return this.authModel.findOneAndUpdate({ _id: id }, { $pull: { reviews: reviewId } }).then((res) => {
            console.log('review removed: ', res);

            this.gameModel.findOneAndUpdate({ _id: gameId }, { $pull: { reviews: reviewId } }).then((res) => {
                console.log('review removed: ', res);
            });

            this.neo4jService.runQuery(
                `MATCH (a:User {id: $id})-[r:REVIEWS]->(b:Review {id: $reviewId}) DELETE r`,
                {
                    id: id,
                    reviewId: reviewId,
                }
            );

            return res;
        });
    }

    async getOwnedGames(id: string): Promise<Game[]> {
        console.log('getOwnedGames called');
        return this.authModel.findOne({ _id: id }).then((res) => {
            console.log('owned games found: ', res.ownedGames);
            return res.ownedGames;
        });
    }

    async getRecommendedGames(id: string): Promise<Game[]> {
        console.log('getRecommendedGames called');
        return this.authModel.findOne({ _id: id }).then((res) => {
            console.log('recommended games found: ', res.recommended);
            return res.recommended;
        });
    }

    async getFriendRequests(id: string): Promise<Auth[]> {
        console.log('getFriendRequests called');
        return this.authModel.findOne({ _id: id }).then((res) => {
            console.log('friend requests found: ', res.friendRequests);
            return res.friendRequests;
        });
    }

    async getFriends(id: string): Promise<Auth[]> {
        console.log('getFriends called');
        return this.authModel.findOne({ _id: id }).then((res) => {
            console.log('friends found: ', res.friends);
            return res.friends;
        });
    }

    async getReviews(id: string): Promise<Review[]> {
        console.log('getReviews called');
        return this.authModel.findOne({ _id: id }).then((res) => {
            console.log('reviews found: ', res.reviews);
            return res.reviews;
        });
    }
};