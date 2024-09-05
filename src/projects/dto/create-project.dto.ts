import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProjectDto {
    @IsNotEmpty({ message: 'O nome do projeto é obrigatório' })
    @IsString({ message: 'O nome do projeto deve ser uma string' })
    @MaxLength(255, {
        message: 'O nome do projeto deve ter no máximo 255 caracteres',
    })
    name: string;

    @IsNotEmpty({ message: 'A descrição do projeto é obrigatória' })
    @IsString({ message: 'A descrição do projeto deve ser uma string' })
    description: string;
}
