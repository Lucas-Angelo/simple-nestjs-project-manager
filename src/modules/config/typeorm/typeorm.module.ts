import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'database/sqlite.db',
            synchronize: true,
            dropSchema: true,
            autoLoadEntities: true,
        }),
    ],
})
export class TypeOrmConfigModule {}
