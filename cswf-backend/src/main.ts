import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import gameRouter = require('./games/game.routes');
import * as mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  if (process.env.NODE_ENV !== 'test') {
    mongoose.connect("mongodb+srv://user:wachtwoord123@mist.kedrtal.mongodb.net/?retryWrites=true&w=majority");
  }

  app.use("/api/game", gameRouter);


  await app.listen(3000);
}
bootstrap();
