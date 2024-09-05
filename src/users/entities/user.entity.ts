import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {
    COLUMN_NAMES,
    ENTITY_NAMES,
} from '../../common/constants/database.constants';
import { Project } from '../../projects/entities/project.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity({ name: ENTITY_NAMES.USER, orderBy: { firstName: 'ASC' } })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Project, (project) => project.user)
    projects: Project[];

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];

    @Column({
        name: COLUMN_NAMES.USER.FIRST_NAME,
        nullable: false,
        length: 100,
    })
    firstName: string;

    @Column({ name: COLUMN_NAMES.USER.LAST_NAME, nullable: false, length: 100 })
    lastName: string;

    @Column({
        name: COLUMN_NAMES.USER.EMAIL,
        unique: true,
        nullable: false,
        length: 255,
    })
    email: string;

    @Column({ name: COLUMN_NAMES.USER.PASSWORD, nullable: false, select: false })
    password: string;
}
