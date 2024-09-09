import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Auth } from 'src/auth/auth.schema';
import { Game } from 'src/games/game.schema';

export type PublisherDocument = HydratedDocument<Publisher>;

@Schema()
export class Publisher {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop()
    foundedOn: Date;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }] })
    gamesPublished: Game[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' }], required: true })
    createdByUser: Auth;
}

export const PublisherSchema = SchemaFactory.createForClass(Publisher);