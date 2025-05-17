import {TasksService} from "./tasks.service";

describe("TasksService", () => {
  let service: TasksService;
  beforeEach(() => {
    service = new TasksService();
  });
  it("should be created", () => {
    const task = service.create({title: "Test title", content: "Test content"});
    expect(task.id).toEqual(1);
    expect(task.title).toEqual("Test title");
    expect(task.content).toEqual("Test content");
  });
  it("should throw an error in created", () => {
    const createTask1 = () =>
      service.create({title: "", content: "Test content"});
    const createTask2 = () => service.create({title: "title ", content: ""});
    expect(createTask1).toThrow();
    expect(createTask2).toThrow();
  });
  it("should find all tasks", () => {
    service.create({title: "Test title 1", content: "Test content 1"});
    service.create({title: "Test title 2", content: "Test content 2"});
    const tasks = service.findAll();
    expect(tasks.length).toEqual(2);
    expect(tasks[0]).toStrictEqual({
      id: 1,
      title: "Test title 1",
      content: "Test content 1",
    });
    expect(tasks[1]).toStrictEqual({
      id: 2,
      title: "Test title 2",
      content: "Test content 2",
    });
  });
  it("should find one tasks by id", () => {
    service.create({title: "Test title 1", content: "Test content 1"});
    const task = service.findOne(1);
    expect(task.id).toEqual(1);
    expect(task).toStrictEqual({
      id: 1,
      title: "Test title 1",
      content: "Test content 1",
    });
  });
  it("should throw an error in find one task by id", () => {
    service.create({title: "Test title 1", content: "Test content 1"});
    expect(() => service.findOne(2)).toThrow();
  });
  it("should update an task", () => {
    service.create({title: "Test title 1", content: "Test content 1"});
    const updated = service.update(1, {
      title: "Updated title",
      content: "Updated content",
    });
    expect(updated.title).toEqual("Updated title");
    expect(updated.content).toEqual("Updated content");
  });
  it("should  throw an error in update task", () => {
    service.create({title: "Test title 1", content: "Test content 1"});
    const updateAction = () =>
      service.update(2, {
        title: "Updated title",
        content: "Updated content",
      });
    expect(updateAction).toThrow();
  });
  it("should remove a task by id", () => {
    service.create({title: "Test title 1", content: "Test content 1"});
    const result = service.remove(1);
    expect(result).toStrictEqual({message: "Task deleted"});
  });
});
