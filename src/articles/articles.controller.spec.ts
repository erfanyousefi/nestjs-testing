import {INestApplication, NotFoundException} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as request from "supertest";
import {ArticlesModule} from "./articles.module";
import {ArticlesService} from "./articles.service";
const article = {
  id: 1,
  title: "article title",
  description: "article description",
};
const mockArticleService = {
  findAll: jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve([]))
    .mockImplementationOnce(() => Promise.resolve([article])),
  findOne: jest.fn((id: number) => {
    if (id === 1) return Promise.resolve(article);
    if (id === 2) {
      return Promise.resolve({
        id,
        title: article.title,
        description: article.description,
      });
    }
    return Promise.reject(new NotFoundException());
  }),
  create: jest.fn().mockReturnValue(article),
  save: jest.fn().mockResolvedValue(article),
  remove: jest.fn().mockResolvedValue(article),
};
describe("ArticlesController", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const appModule: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "mysql",
          host: "localhost",
          port: 3306,
          username: "root",
          password: "root",
          database: "unit-test-db",
          autoLoadEntities: true,
          synchronize: true,
        }),
        ArticlesModule,
      ],
    })
      .overrideProvider(ArticlesService)
      .useValue(mockArticleService)
      .compile();

    app = appModule.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    if (app) await app.close();
  });
  describe("GET /articles", () => {
    it("should be find empty list of articles", async () => {
      const response = await request(app.getHttpServer()).get("/articles");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
    it("should be find all articles", async () => {
      const response = await request(app.getHttpServer()).get("/articles");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([article]);
    });
  });
  describe("POST /articles", () => {
    it("should create a new article", async () => {
      const response = await request(app.getHttpServer())
        .post("/articles")
        .send({
          title: "new article",
          description: "new description",
        });
      expect(response.status).toBe(201);
      expect(response.body).toEqual(article);
    });
  });
  describe("GET /articles by id", () => {
    it("should get an article by id", async () => {
      const response = await request(app.getHttpServer()).get("/articles/2");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({...article, id: 2});
    });
    it("should throw an error in get article by id", async () => {
      const response = await request(app.getHttpServer()).get("/articles/3");
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
    });
  });
});
