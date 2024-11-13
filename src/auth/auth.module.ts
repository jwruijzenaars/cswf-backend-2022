import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { Auth, AuthSchema } from './auth.schema';
import { AuthService } from './auth.service';
import { Neo4jService } from 'src/neo4j/neo4j.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }])],
    controllers: [AuthController],
    providers: [AuthService, Neo4jService],
    exports: [AuthService],
})
export class AuthModule { }