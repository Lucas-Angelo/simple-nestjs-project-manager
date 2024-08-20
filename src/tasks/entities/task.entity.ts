import { Project } from '../../projects/entities/project.entity';
import { User } from '../../users/entities/user.entity';

export class Task {
  id: number;

  name: string;

  description: string;

  status: TaskStatus;

  createdAt: Date;

  date: Date;

  project: Project;

  user: User;
}

export enum TaskStatus {
  pending = 'pending',
  completed = 'completed',
}
