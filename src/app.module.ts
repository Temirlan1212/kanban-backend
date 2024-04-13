import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { BoardColumnsModule } from './board-columns/board-columns.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    BoardsModule,
    BoardColumnsModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
