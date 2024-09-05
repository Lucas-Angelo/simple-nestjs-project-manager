import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {
    COLUMN_NAMES,
    ENTITY_NAMES,
} from '../../common/constants/database.constants';
import { Task } from '../../tasks/entities/task.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: ENTITY_NAMES.PROJECT, orderBy: { name: 'ASC' } })
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.projects, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    user: User;

    @OneToMany(() => Task, (task) => task.project, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    tasks: Task[];

    @Column({ name: COLUMN_NAMES.PROJECT.NAME, nullable: false, length: 255 })
    name: string;

    @Column({
        name: COLUMN_NAMES.PROJECT.DESCRIPTION,
        nullable: false,
        type: 'text',
    })
    description: string;
}
