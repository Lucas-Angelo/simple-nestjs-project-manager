import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        private readonly usersService: UsersService,
    ) {}

    async create(createProjectDto: CreateProjectDto) {
        const user = await this.usersService.findOne(createProjectDto.userId);
        return await this.projectRepository.save({ ...createProjectDto, user });
    }

    async findAll() {
        return await this.projectRepository.find();
    }

    async findOne(id: number) {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: ['tasks'],
        });

        if (!project)
            throw new NotFoundException(`Project with ID ${id} not found`);

        return project;
    }

    async update(id: number, updateProjectDto: UpdateProjectDto) {
        const project = await this.findOne(id);
        await this.projectRepository.update(project.id, updateProjectDto);
        const updatedProject = await this.findOne(id);
        return updatedProject;
    }

    async remove(id: number) {
        const project = await this.findOne(id);
        await this.projectRepository.remove(project);
    }

    async findById(id: number) {
        const project = await this.projectRepository.findOne({ where: { id } });

        if (!project)
            throw new NotFoundException(`Project with ID ${id} not found`);

        return project;
    }
}
