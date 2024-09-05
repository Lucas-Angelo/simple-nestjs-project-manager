import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DEFAULT_PAGE_SIZE, FilterDto } from 'src/modules/pagination/dto/filter.dto';
import { PageService } from 'src/modules/pagination/page/page.service';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
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
    ) { }

    async create(userEmail: string, createProjectDto: CreateProjectDto) {
        const user = await this.usersService.findOneByOrFail({ email: userEmail });

        return await this.projectRepository.save({
            ...createProjectDto,
            user,
        });
    }

    async findOneByIdAndUser(projectId: number, user: any) {
        const project = await this.projectRepository.findOne({
            where: { id: projectId, user },
        });

        if (!project)
            throw new NotFoundException(`Projeto com ID ${projectId} não encontrado para o usuário`);

        return project;
    }

    async findAll(userEmail: string) {
        const user = await this.usersService.findOneByOrFail({ email: userEmail });

        return this.projectRepository.find({ where: { user } });
    }

    async findAllPaginated(userEmail: string, filter?: FilterDto) {
        if (!filter)
            return this.findAll(userEmail);

        const user = await this.usersService.findOneByOrFail({ email: userEmail });

        return this.pageService.paginate(
            this.projectRepository,
            { page: filter.page, pageSize: DEFAULT_PAGE_SIZE },
            { user },
        );
    }

    async findOne(userEmail: string, id: number) {
        const user = await this.usersService.findOneByOrFail({ email: userEmail });

        const project = await this.projectRepository.findOne({
            where: { id, user },
            relations: { tasks: true },
        });

        if (!project)
            throw new NotFoundException(`Projeto com ID ${id} não encontrado para o usuário`);

        return project;
    }

    async update(userEmail: string, id: number, updateProjectDto: UpdateProjectDto) {
        const user = await this.usersService.findOneByOrFail({ email: userEmail });
        const project = await this.findOne(user.email, id);

        if (!project)
            throw new NotFoundException(`Projeto com ID ${id} não encontrado para o usuário`);

        return this.projectRepository.update(id, updateProjectDto);
    }

    async remove(userEmail: string, id: number) {
        const project = await this.findOne(userEmail, id);

        if (!project)
            throw new NotFoundException(`Projeto com ID ${id} não encontrado para o usuário`);

        return this.projectRepository.delete(id);
    }
}
