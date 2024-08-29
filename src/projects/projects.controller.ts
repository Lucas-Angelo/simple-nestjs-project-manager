import {
    CACHE_MANAGER,
    CacheInterceptor,
    CacheTTL,
} from '@nestjs/cache-manager';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Param,
    Patch,
    Post,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_CONSTANTS } from 'src/common/constants/app.constants';
import { FilterDto } from 'src/modules/pagination/dto/filter.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(
        private readonly projectsService: ProjectsService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createProjectDto: CreateProjectDto) {
        const result = await this.projectsService.create(createProjectDto);
        await this.clearCache();
        return result;
    }

    @Get()
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(CACHE_CONSTANTS.DEFAULT_CACHE_TTL)
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() filter?: FilterDto) {
        console.log('buscando projetos...');
        return this.projectsService.findAllPaginated(filter);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string) {
        return this.projectsService.findOne(+id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id') id: string,
        @Body() updateProjectDto: UpdateProjectDto,
    ) {
        const result = await this.projectsService.update(+id, updateProjectDto);
        await this.clearCache();
        return result;
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        await this.projectsService.remove(+id);
        await this.clearCache();
    }

    private async clearCache() {
        await this.cacheManager.reset();
        console.log('Cache limpo após alteração de dados.');
    }
}
