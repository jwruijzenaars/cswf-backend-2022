import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { DeveloperController } from './developer.controller';
import { Developer, DeveloperSchema } from './developer.schema';
import { DeveloperService } from './developer.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Developer.name, schema: DeveloperSchema }])],
    controllers: [DeveloperController],
    providers: [DeveloperService],
    exports: [DeveloperService],
})
export class DeveloperModule { }