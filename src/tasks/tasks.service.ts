import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsService } from '../projects/projects.service';
import { UsersService } from '../users/users.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        private readonly projectsService: ProjectsService,
        private readonly usersService: UsersService,
    ) { }

    async create(userEmail: string, createTaskDto: CreateTaskDto) {
        const user = await this.usersService.findOneByOrFail({ email: userEmail });
        const project = await this.projectsService.findOneByIdAndUser(createTaskDto.projectId, user);

        return this.taskRepository.save({
            ...createTaskDto,
            project,
            user,
        });
    }

    async findAll(userEmail: string) {
        const user = await this.usersService.findOneByOrFail({ email: userEmail });
        return this.taskRepository.find({ relations: ['project'], where: { user } });
    }

    async findOne(userEmail: string, id: number) {
        const user = await this.usersService.findOneByOrFail({ email: userEmail });
        const task = await this.taskRepository.findOne({ where: { id, user }, relations: ['project'] });

        if (!task)
            throw new NotFoundException(`Tarefa com ID ${id} não encontrada para o usuário`);

        return task;
    }

    async update(userEmail: string, id: number, updateTaskDto: UpdateTaskDto) {
        const user = await this.usersService.findOneByOrFail({ email: userEmail });
        const task = await this.taskRepository.findOneByOrFail({ id, user });

        if (!task)
            throw new NotFoundException(`Tarefa com ID ${id} não encontrada para o usuário`);

        return this.taskRepository.update(id, updateTaskDto);
    }

    async remove(userEmail: string, id: number) {
        const task = await this.findOne(userEmail, id);

        if (!task)
            throw new NotFoundException(`Tarefa com ID ${id} não encontrada para o usuário`);

        return this.taskRepository.delete(id);
    }
}
