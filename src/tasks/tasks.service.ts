import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsService } from 'src/projects/projects.service';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        private readonly projectsService: ProjectsService,
    ) {}

    async create(createTaskDto: CreateTaskDto) {
        const project = await this.projectsService.findById(
            createTaskDto.projectId,
        );
        return this.taskRepository.save({ ...createTaskDto, project });
    }

    async findAll() {
        return this.taskRepository.find();
    }

    async findOne(id: number) {
        const task = await this.taskRepository.findOne({ where: { id } });

        if (!task) throw new NotFoundException(`Task with ID ${id} not found`);

        return task;
    }

    async update(id: number, updateTaskDto: UpdateTaskDto) {
        const task = await this.findOne(id);
        await this.taskRepository.update(task.id, updateTaskDto);
        const updatedTask = await this.findOne(id);
        return updatedTask;
    }

    async remove(id: number) {
        const task = await this.findOne(id);
        await this.taskRepository.remove(task);
    }
}
