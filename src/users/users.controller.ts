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
import { Public } from 'src/modules/auth/auth-guard/auth-guard.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Public()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(@Req() request) {
        return this.usersService.findAll(request.user?.username);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Req() request, @Param('id') id: string) {
        return this.usersService.findOne(request.user?.username, +id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(@Req() request, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(request.user?.username, +id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Req() request, @Param('id') id: string) {
        return this.usersService.remove(request.user?.username, +id);
    }
}