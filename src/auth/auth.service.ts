import { Injectable, Scope } from '@nestjs/common';
import { Model } from 'mongoose';
import { Auth } from './auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { JwtPayload } from 'jsonwebtoken';

@Injectable({ scope: Scope.DEFAULT })
export class AuthService {

    jwtSecret = 'secret';
    constructor(@InjectModel(Auth.name) private authModel: Model<Auth>, private neo4jService: Neo4jService) { };

    async login(body: any): Promise<any> {
        console.log('login called');
        let newUser: any;
        const res = await this.authModel.find({ email: body.email })
        console.log('res: ', res);
        var auth = res[0];
        if (auth.email === body.email && auth.password === body.password) {
            const payload = {
                _id: auth._id,
            }
            console.log('payload: ', payload);
            newUser = {
                _id: auth._id,
                token: jwt.sign(payload, this.jwtSecret, { expiresIn: '2h' }),
                email: auth.email,
                password: auth.password,
                userName: auth.userName,
                wishlist: auth.wishlist,
                recommended: auth.recommended,
                ownedGames: auth.ownedGames,
                reviews: auth.reviews,
                friends: auth.friends,
                friendRequests: auth.friendRequests,
            };
            console.log(newUser);
            return newUser;
        } else {
            console.log('login failed');
            return Promise.reject('login failed');
        }
    };

    async register(body: any): Promise<any> {
        console.log('register called');
        var possibleProblem = await this.authModel.findOne({ email: body.newUser.email })

        if (possibleProblem != null || possibleProblem != undefined) {
            console.log('user already exists');
            return Promise.reject('user already exists');
        } else {
            var newUser = {
                userName: body.newUser.userName,
                email: body.newUser.email,
                password: body.newUser.password,
                wishlist: [],
                recommended: [],
                ownedGames: [],
                reviews: [],
                friends: [],
                friendRequests: [],
            };
            var createdUser = await this.authModel.create(newUser);
            var payload = {
                _id: createdUser._id,
            }

            this.neo4jService.runQuery(
                `CREATE (a:User {id: $id, email: $email, userName: $userName, password: $password, wishlist: $wishlist, recommended: $recommended, ownedGames: $ownedGames, reviews: $reviews, friends: $friends, friendRequests: $friendRequests}) RETURN a`,
                {
                    id: createdUser._id,
                    email: createdUser.email,
                    userName: createdUser.userName,
                    password: createdUser.password,
                    wishlist: createdUser.wishlist,
                    recommended: createdUser.recommended,
                    ownedGames: createdUser.ownedGames,
                    reviews: createdUser.reviews,
                    friends: createdUser.friends,
                    friendRequests: createdUser.friendRequests,
                }
            );
            return {
                _id: createdUser._id,
                token: jwt.sign(payload, this.jwtSecret, { expiresIn: '2h' }),
                email: createdUser.email,
                password: createdUser.password,
                userName: createdUser.userName,
                wishlist: createdUser.wishlist,
                recommended: createdUser.recommended,
                ownedGames: createdUser.ownedGames,
                reviews: createdUser.reviews,
                friends: createdUser.friends,
                friendRequests: createdUser.friendRequests,
            }
        }
    }

    async getAuth(id: string): Promise<Auth> {
        console.log('getAuth called');

        return this.authModel.findOne({ _id: id }).then((res) => {
            console.log('auth found: ', res);
            return res;
        });
    }

    async getAllAuths(): Promise<Auth[]> {
        console.log('getAllAuths called');

        return this.authModel.find({}).then((res) => {
            return res;
        });
    }

    async updateAuth(id: string, user: any, token: string): Promise<Auth> {
        console.log('updateUser called');

        this.authModel.findById(id).then((res) => {
            jwt.verify(token, this.jwtSecret, (err, decoded) => {
                if (err || !(decoded as JwtPayload)._id || (decoded as JwtPayload)._id != id) {
                    return Promise.reject('unauthorized');
                }
            });
        });

        this.neo4jService.runQuery(
            `MATCH (a:User {id: $id}) SET a += {email: $email, userName: $userName, password: $password, wishlist: $wishlist, recommended: $recommended, ownedGames: $ownedGames, reviews: $reviews, friends: $friends, friendRequests: $friendRequests} RETURN a`,
            {
                id: id,
                email: user.email,
                userName: user.userName,
                password: user.password,
                wishlist: user.wishlist,
                recommended: user.recommended,
                ownedGames: user.ownedGames,
                reviews: user.reviews,
                friends: user.friends,
                friendRequests: user.friendRequests,
            }
        );

        return await this.authModel.findOneAndUpdate({ _id: id }, user, { returnDocument: "after" }).then((res) => {
            console.log('updateUser successful: ', res);
            return res;
        });
    }

    async validateToken(token: string): Promise<any> {
        console.log('validateToken called');
        return jwt.verify(token, this.jwtSecret, (err, decoded) => {
            if (err) {
                console.log('validateToken failed');
                return false;
            } else {
                console.log('validateToken successful');
                return true;
            }
        });
    }
};
