import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    DEFAULT_PAGE_SIZE,
    FilterDto,
    MAX_PAGE_SIZE,
} from 'src/modules/pagination/dto/filter.dto';
import { PageService } from 'src/modules/pagination/page/page.service';
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
        private readonly pageService: PageService,
    ) {}

    async create(createProjectDto: CreateProjectDto) {
        const user = await this.usersService.findOne(createProjectDto.userId);
        return await this.projectRepository.save({ ...createProjectDto, user });
    }

    async findAllPaginated(filter?: FilterDto) {
        if (!filter) return this.findAll();

        if (filter.pageSize > MAX_PAGE_SIZE) filter.pageSize = MAX_PAGE_SIZE;
        else if (filter.pageSize < 1) filter.pageSize = 1;
        else if (!filter.pageSize) filter.pageSize = DEFAULT_PAGE_SIZE;

        return this.pageService.paginate(this.projectRepository, {
            page: filter.page,
            pageSize: filter.pageSize,
        });
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
