import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from 'src/projects/projects.module';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
    imports: [TypeOrmModule.forFeature([Task]), ProjectsModule],
    controllers: [TasksController],
    providers: [TasksService],
})
export class TasksModule {}
