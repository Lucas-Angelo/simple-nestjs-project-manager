import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'O primeiro nome é obrigatório' })
    @IsString({ message: 'O primeiro nome deve ser uma string' })
    firstName: string;

    @IsNotEmpty({ message: 'O sobrenome é obrigatório' })
    @IsString({ message: 'O sobrenome deve ser uma string' })
    lastName: string;

    @IsNotEmpty({ message: 'O email é obrigatório' })
    @IsEmail({}, { message: 'O email deve ser um endereço de email válido' })
    email: string;

    @IsNotEmpty({ message: 'A senha é obrigatória' })
    @IsString({ message: 'A senha deve ser uma string' })
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    password: string;
}
