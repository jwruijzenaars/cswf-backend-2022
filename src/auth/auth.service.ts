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
        return await this.authModel.find({ email: body.email }).then((res) => {
            res.forEach((auth) => {

                if (auth.email === body.email && auth.password === body.password) {
                    const payload = {
                        _id: auth._id,
                    }
                    jwt.sign(payload, this.jwtSecret, { expiresIn: '2h' }, (err, token) => {
                        newUser = {
                            _id: auth._id,
                            token: token,
                            email: auth.email,
                            password: auth.password,
                            userName: auth.userName,
                            wishlist: auth.wishlist,
                            recommended: auth.recommended,
                            ownedGames: auth.ownedGames,
                            reviews: auth.reviews,
                            friends: auth.friends,
                        }
                        console.log(newUser);
                        return newUser;

                    });


                } else {
                    console.log('login failed');
                    return Promise.reject('login failed');
                }
            });
        });
    };

    async register(body: Auth): Promise<Auth> {
        console.log('register called');
        return await this.authModel.create(body).then((res) => {
            console.log('user registered succesfully');
            return res;
        });
    };

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

};
