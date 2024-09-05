import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from '../projects/projects.module';
import { UsersModule } from '../users/users.module';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
    imports: [TypeOrmModule.forFeature([Task]), ProjectsModule, UsersModule],
    controllers: [TasksController],
    providers: [TasksService],
})
export class TasksModule { }
