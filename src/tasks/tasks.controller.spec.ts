import {Test, TestingModule} from "@nestjs/testing";
import {TasksController} from "./tasks.controller";
import {TasksService} from "./tasks.service";

describe("TasksController", () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();
    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
  it("should return all tasks", () => {
    const mockedTasks = [{id: 1, title: "Task 1", content: "Task 1 content"}];
    jest.spyOn(service, "findAll").mockReturnValue(mockedTasks);
    const tasks = controller.findAll();
    expect(tasks).toEqual(mockedTasks);
  });
  it("should return a task by id", () => {
    const mockedTask = {id: 1, title: "Task 1", content: "Task 1 content"};
    jest.spyOn(service, "findOne").mockReturnValue(mockedTask);
    const task = controller.findOne(1);
    expect(task).toEqual(mockedTask);
  });
  it("should return a task by id", () => {
    const mockedResponse = {
      id: 1,
      title: "Updated Title",
      content: "updated content",
    };
    jest.spyOn(service, "update").mockReturnValue(mockedResponse);
    const response = controller.update("1", {title: "Updated Title"});
    expect(response).toEqual(mockedResponse);
  });
});
