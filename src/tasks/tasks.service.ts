import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";

export interface Task {
  id: number;
  title: string;
  content: string;
}
@Injectable()
export class TasksService {
  private todos: Task[] = [];
  create({title, content}: CreateTaskDto) {
    if (!title || !content) throw new BadRequestException();
    const taskId = this.todos.length + 1;
    const newTask = {
      id: taskId,
      title,
      content,
    };
    this.todos.push(newTask);
    return newTask;
  }

  findAll() {
    return this.todos;
  }

  findOne(id: number) {
    const todo = this.todos.find((todo) => todo.id == id);
    if (!todo) throw new NotFoundException();
    return todo;
  }

  update(id: number, {title, content}: UpdateTaskDto) {
    const taskIndex = this.todos.findIndex((todo) => todo.id == id);
    if (taskIndex === -1) throw new NotFoundException();
    Object.assign(this.todos[taskIndex], {title, content});
    return this.todos[taskIndex];
  }

  remove(id: number) {
    const taskIndex = this.todos.findIndex((todo) => todo.id == id);
    if (taskIndex === -1) throw new NotFoundException();
    this.todos.splice(taskIndex, 1);
    return {message: "Task deleted"};
  }
}
