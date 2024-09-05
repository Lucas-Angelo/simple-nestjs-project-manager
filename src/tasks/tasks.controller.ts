import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Req,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Req() request, @Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(request.user?.username, createTaskDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(@Req() request) {
        return this.tasksService.findAll(request.user?.username);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Req() request, @Param('id') id: string) {
        return this.tasksService.findOne(request.user?.username, +id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(@Req() request, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.tasksService.update(request.user?.username, +id, updateTaskDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Req() request, @Param('id') id: string) {
        return this.tasksService.remove(request.user?.username, +id);
    }
}
