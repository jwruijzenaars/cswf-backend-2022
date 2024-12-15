import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Auth, AuthSchema } from 'src/auth/auth.schema';
import { Game, GameSchema } from 'src/games/game.schema';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]), MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]), AuthModule],
    controllers: [UserController],
    providers: [UserService, Neo4jService],
    exports: [UserService],
})
export class UserModule { }