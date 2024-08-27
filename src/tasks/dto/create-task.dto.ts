import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
} from 'class-validator';
import { TaskStatus } from '../enum/task.status.enum';

export class CreateTaskDto {
    @IsNotEmpty({ message: 'O nome da tarefa é obrigatório' })
    @IsString({ message: 'O nome da tarefa deve ser uma string' })
    @MaxLength(255, {
        message: 'O nome da tarefa deve ter no máximo 255 caracteres',
    })
    name: string;

    @IsString({ message: 'A descrição da tarefa deve ser uma string' })
    description: string;

    @IsNotEmpty({ message: 'O status da tarefa é obrigatório' })
    @IsEnum(TaskStatus, {
        message: 'O status da tarefa deve ser um valor válido',
    })
    status: TaskStatus;

    @IsNotEmpty({ message: 'A data da tarefa é obrigatória' })
    @IsDateString({}, { message: 'A data da tarefa deve ser uma data válida' })
    date: Date;

    @IsNotEmpty({ message: 'O ID do projeto é obrigatório' })
    @IsNumber({}, { message: 'O ID do projeto deve ser um número' })
    projectId: number;
}
