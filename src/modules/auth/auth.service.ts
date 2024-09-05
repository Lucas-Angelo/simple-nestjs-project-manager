import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { UsersService } from "src/users/users.service";

const DEFAULT_ERROR_MESSAGE = 'Usuário ou senha inválidos';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async login(email: string, password: string) {
        const user = await this.usersService.findOneWithPassword(email);

        if (!user)
            throw new UnauthorizedException(DEFAULT_ERROR_MESSAGE);

        const isAValidUser = await compare(password, user.password);

        if (!isAValidUser)
            throw new UnauthorizedException(DEFAULT_ERROR_MESSAGE);

        console.log(user);
        const payload = { sub: user.id, username: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
