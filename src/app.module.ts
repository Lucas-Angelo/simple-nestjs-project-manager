import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigModule } from './modules/config/typeorm/typeorm.module';
import { PaginationModule } from './modules/pagination/pagination.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        UsersModule,
        TasksModule,
        ProjectsModule,
        TypeOrmConfigModule,
        PaginationModule,
        CacheModule.register({
            isGlobal: true,
            store: redisStore,
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
