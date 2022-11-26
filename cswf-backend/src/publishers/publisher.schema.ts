import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PublisherDocument = HydratedDocument<Publisher>;

@Schema()
export class Publisher {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop()
    foundedOn: Date;
}

export const PublisherSchema = SchemaFactory.createForClass(Publisher);