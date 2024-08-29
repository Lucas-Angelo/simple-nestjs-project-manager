import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

export class FilterDto {
    @Transform(({ value }) => parseInt(value))
    @IsNumber({}, { message: ' atributo "page" deve ser um número ' })
    public page: number = 1;

    @Transform(({ value }) => parseInt(value))
    @IsNumber({}, { message: ' atributo "pageSize" deve ser um número ' })
    public pageSize: number = DEFAULT_PAGE_SIZE;
}
