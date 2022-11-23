import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GameModule } from './games/game.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DeveloperModule } from './developers/developer.module';
ConfigModule.forRoot();

@Module({
  imports: [GameModule, DeveloperModule, MongooseModule.forRoot('mongodb+srv://user:wachtwoord123@mist.kedrtal.mongodb.net/CSWF?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
