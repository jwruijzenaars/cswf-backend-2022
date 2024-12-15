import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameSchema } from './game.schema';
import { GameService } from './game.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Auth, AuthSchema } from 'src/auth/auth.schema';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { UserService } from 'src/user/user.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Game', schema: GameSchema }]), MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]), AuthModule],
    controllers: [GameController],
    providers: [GameService, UserService, Neo4jService],
    exports: [GameService],
})
export class GameModule { }