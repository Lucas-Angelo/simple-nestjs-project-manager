import { FindOptionsWhere, Repository } from 'typeorm';
import { FilterDto } from '../dto/filter.dto';
import { PaginatedDto } from '../dto/paginated.dto';

export class PageService {
    async paginate<T>(
        repository: Repository<T>,
        filter: FilterDto,
        where?: FindOptionsWhere<T>,
    ): Promise<PaginatedDto<T>> {
        const limit = (filter.page - 1) * filter.pageSize;
        const offset = filter.pageSize;

        const [results, total] = await repository.findAndCount({
            skip: limit,
            take: offset,
            where: where,
        });

        return {
            results,
            total,
            limit,
            offset,
        };
    }
}
