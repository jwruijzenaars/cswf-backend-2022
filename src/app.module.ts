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
import { UserModule } from './user/user.module';
ConfigModule.forRoot();

@Module({
  imports: [
    AuthModule,
    GameModule,
    DeveloperModule,
    PublisherModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    Neo4jModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
