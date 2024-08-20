import { Task } from '../../tasks/entities/task.entity';
import { User } from '../../users/entities/user.entity';

export class Project {
  id: number;

  name: string;

  description: string;

  users: User[];

  tasks: Task[];
}
