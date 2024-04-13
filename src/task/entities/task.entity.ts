import { Task as TaskModule } from '@prisma/client';

export class TaskEntity implements TaskModule {
  createdAt: Date;
  updatedAt: Date;
  id: string;

  title: string;
  status: string;
  deadline: string;
  priority: string;
  executors: string;
}
