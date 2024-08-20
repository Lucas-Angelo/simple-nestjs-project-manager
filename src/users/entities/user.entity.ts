import { Project } from '../../projects/entities/project.entity';
import { Task } from '../../tasks/entities/task.entity';

export class User {
  id: number;

  firstName: string;

  lastName: string;

  email: string;

  password: string;

  projects: Project[];

  tasks: Task[];
}
