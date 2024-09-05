import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private readonly DEFAULT_SALT_ROUNDS = 10;

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await hash(createUserDto.password, this.DEFAULT_SALT_ROUNDS);
        const user = await this.userRepository.save({
            ...createUserDto,
            password: hashedPassword,
        });
        user.password = undefined;
        return user;
    }

    async findOneByOrFail(criteria: Partial<User>) {
        return this.userRepository.findOneByOrFail(criteria);
    }

    async findOneWithPassword(email: string) {
        return this.userRepository.createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email })
            .getOne();
    }

    async findAll(username: string) {
        return this.userRepository.find({ where: { email: username } });
    }

    async findOne(username: string, id: number) {
        const user = await this.userRepository.findOneBy({ email: username, id });
        if (!user)
            throw new NotFoundException(`Usuário com id ${id} não encontrado`);
        return user;
    }

    async update(username: string, id: number, updateUserDto: UpdateUserDto) {
        const user = await this.findOneByOrFail({ email: username, id });
        Object.assign(user, updateUserDto);
        return this.userRepository.save(user);
    }

    async remove(username: string, id: number) {
        const user = await this.findOneByOrFail({ email: username, id });
        return this.userRepository.remove(user);
    }
}