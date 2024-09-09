import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Auth } from 'src/auth/auth.schema';
import { Game } from 'src/games/game.schema';

export type DeveloperDocument = HydratedDocument<Developer>;

@Schema()
export class Developer {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop()
    foundedOn: Date;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }], required: true })
    gamesMade: Game[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' }], required: true })
    createdByUser: Auth;
}

export const DeveloperSchema = SchemaFactory.createForClass(Developer);