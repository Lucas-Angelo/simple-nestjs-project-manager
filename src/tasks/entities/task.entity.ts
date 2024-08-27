import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {
    COLUMN_NAMES,
    ENTITY_NAMES,
} from '../../common/constants/database.constants';
import { Project } from '../../projects/entities/project.entity';
import { User } from '../../users/entities/user.entity';
import { TaskStatus } from '../enum/task.status.enum';

@Entity({ name: ENTITY_NAMES.TASK, orderBy: { date: 'ASC' } })
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Project, (project) => project.tasks, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    project: Project;

    @ManyToOne(() => User, (user) => user.tasks, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    user: User;

    @Column({ name: COLUMN_NAMES.TASK.NAME, nullable: false, length: 255 })
    name: string;

    @Column({
        name: COLUMN_NAMES.TASK.DESCRIPTION,
        type: 'text',
        nullable: true,
    })
    description: string;

    @Column({ name: 'status', nullable: false, length: 255 })
    status: TaskStatus;

    @CreateDateColumn({ name: COLUMN_NAMES.TASK.CREATED_AT })
    createdAt: Date;

    @Column({ name: COLUMN_NAMES.TASK.DATE, type: 'date', nullable: false })
    date: Date;
}
