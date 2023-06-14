import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DispenserModule } from './dispenser/dispenser.module';
import { MongooseModule } from '@nestjs/mongoose';

const DB_HOST = 'localhost';
const DB_PORT = 27017;
const DB_NAME = 'disperserDB';

const MONGO_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

@Module({
  imports: [DispenserModule, MongooseModule.forRoot(`${MONGO_URL}`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
