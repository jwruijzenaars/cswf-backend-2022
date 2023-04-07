import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Game } from 'src/games/game.schema';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {

    @Prop({ required: true, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] })
    email: string;

    @Prop({ required: true })
    userName: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }] })
    wishlist: Game[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }] })
    ownedGames: Game[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }] })
    recommended: Game[];

    @Prop({ type: Object })
    reviews: [{
        game: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }];
        userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' }];
        review: string;
    }];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' }] })
    friends: Auth[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' }] })
    friendRequests: Auth[];

}

export const AuthSchema = SchemaFactory.createForClass(Auth);