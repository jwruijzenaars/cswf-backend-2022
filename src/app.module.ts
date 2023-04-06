import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GameModule } from './games/game.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DeveloperModule } from './developers/developer.module';
import { PublisherModule } from './publishers/publisher.module';
import { AuthModule } from './auth/auth.module';
import { Neo4jModule } from './neo4j/neo4j.module';
ConfigModule.forRoot();

@Module({
  imports: [AuthModule, GameModule, DeveloperModule, PublisherModule, MongooseModule.forRoot('mongodb+srv://user:wachtwoord123@mist.kedrtal.mongodb.net/CSWF?retryWrites=true&w=majority'), Neo4jModule.forRoot({
    scheme: 'neo4j',
    host: 'localhost',
    port: 7687,
    username: 'neo4j',
    password: 'neo'
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
