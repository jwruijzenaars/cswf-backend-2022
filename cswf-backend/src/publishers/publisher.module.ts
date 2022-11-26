import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Developer, DeveloperSchema } from 'src/developers/developer.schema';
import { PublisherController } from './publisher.controller';
import { PublisherService } from './publisher.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Developer.name, schema: DeveloperSchema }])],
    controllers: [PublisherController],
    providers: [PublisherService],
    exports: [PublisherService],
})
export class DeveloperModule { }