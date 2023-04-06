import { Injectable, Scope } from '@nestjs/common';
import { Model } from 'mongoose';
import { Auth } from './auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';


@Injectable({ scope: Scope.DEFAULT })
export class AuthService {
    jwtSecret = 'secret';
    constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) { };


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
            };
            console.log(newUser);
            return newUser;
        } else {
            console.log('login failed');
            return Promise.reject('login failed');
        }
    };

    async register(body: Auth): Promise<Auth> {
        console.log('register called');
        await this.authModel.findOne({ email: body.email }).then((res) => {
            var response = {
                status: 400,
                error: 'user already exists',
            };
            return Promise.reject(response);
        });
        return await this.authModel.create(body).then((res) => {
            console.log('register successful');
            return res;
        });
    }

    async validate(body: Auth): Promise<Auth> {
        console.log('validate called');
        return await this.authModel.find({}).then((res) => {
            res.forEach((auth) => {
                if (auth.email === body.email && auth.password === body.password) {
                    console.log('validate successful');
                    return auth
                }
            });
            return Promise.reject('validate failed');
        });
    }

    async getAuth(id: string): Promise<Auth> {
        console.log('getAuth called');
        return this.authModel.findOne({ _id: id }).then((res) => {
            console.log('auth found: ', res);
            return res;
        });
    }

    async addToOwnedGames(id: string, user: any): Promise<Auth> {
        console.log('addToOwnedGames called');
        console.log(user.email);
        return this.authModel.findOneAndUpdate({ _id: id }, user).then((res) => {
            console.log('addToOwnedGames successful: ', res);
            return res;
        });
    }

};
