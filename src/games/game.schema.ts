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

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Publisher' }], required: true })
    releasedBy: Publisher;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Developer' }], required: true })
    developer: Developer;

    @Prop()
    reviews: string[];

}

export const GameSchema = SchemaFactory.createForClass(Game);