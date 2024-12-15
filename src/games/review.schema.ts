import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Auth } from 'src/auth/auth.schema';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
export class Review {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop()
    rating: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth', required: true })
    createdByUser: Auth;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);