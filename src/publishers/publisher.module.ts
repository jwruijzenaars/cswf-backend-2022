import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { PublisherController } from './publisher.controller';
import { Publisher, PublisherSchema } from './publisher.schema';
import { PublisherService } from './publisher.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Publisher.name, schema: PublisherSchema }]), AuthModule],
    controllers: [PublisherController],
    providers: [PublisherService],
    exports: [PublisherService],
})
export class PublisherModule { }