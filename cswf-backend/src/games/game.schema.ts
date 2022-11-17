import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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

    @Prop()
    developer: string;

    @Prop()
    reviews: string[];

}

export const GameSchema = SchemaFactory.createForClass(Game);