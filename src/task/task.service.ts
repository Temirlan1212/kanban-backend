import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Messages } from '../core/consts';
import { PaginatorTypes, paginator } from '@nodeteam/nestjs-prisma-pagination';
import { Task, Prisma } from '@prisma/client';

const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 1 });

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createTodoDto: CreateTaskDto) {
    return await this.prismaService.task.create({
      data: createTodoDto,
    });
  }

  async findAll({
    where,
    orderBy,
    page,
    perPage,
  }: {
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput;
    page: number;
    perPage: number;
  }): Promise<PaginatorTypes.PaginatedResult<Task>> {
    return paginate(
      this.prismaService.task,
      {
        where,
        orderBy,
      },
      {
        perPage,
        page,
      },
    );
  }

  async findOne(id: string) {
    const todo = await this.prismaService.task.findUnique({
      where: { id: String(id) },
    });
    if (!todo) throw new NotFoundException('Todo Not Found');
    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTaskDto) {
    await this.validateOnTodoNotExist(id);
    await this.prismaService.task.update({
      where: { id: String(id) },
      data: updateTodoDto,
    });
    return updateTodoDto;
  }

  async remove(id: string) {
    await this.validateOnTodoNotExist(id);
    await this.prismaService.task.delete({ where: { id } });
    return id;
  }

  private async validateOnTodoNotExist(id: string) {
    return await this.findOne(id);
  }
}
