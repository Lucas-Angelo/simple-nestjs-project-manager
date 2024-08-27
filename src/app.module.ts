import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigModule } from './modules/config/typeorm/typeorm.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [UsersModule, TasksModule, ProjectsModule, TypeOrmConfigModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
