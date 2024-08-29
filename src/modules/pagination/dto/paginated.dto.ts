import { IsNumber } from 'class-validator';

export class PaginatedDto<TData> {
    @IsNumber()
    total: number;

    @IsNumber()
    limit: number;

    @IsNumber()
    offset: number;

    results: TData[];
}
