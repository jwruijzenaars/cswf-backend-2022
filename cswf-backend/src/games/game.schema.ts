import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Developer } from 'src/developers/developer.schema';
import { Publisher } from 'src/publishers/publisher.schema';

export type GameDocument = HydratedDocument<Game>;

@Schema()
export class Game {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop()
    price: number;

    @Prop()
    releasedOn: Date;

    @Prop({ required: true })
    genre: string[];

    @Prop()
    rating: number;

    @Prop({ required: true })
    multiplayer: boolean;

    @Prop()
    ageRating: number;

    @Prop()
    releasedBy: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Developer' }], required: true })
    developer: Developer;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Publisher' }], required: true })
    reviews: Publisher;

}

export const GameSchema = SchemaFactory.createForClass(Game);