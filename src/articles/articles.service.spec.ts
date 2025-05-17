import {NotFoundException} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import {ArticlesService} from "./articles.service";
import {Article} from "./entities/article.entity";
const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  update: jest.fn(),
};
describe("ArticlesService", () => {
  let service: ArticlesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getRepositoryToken(Article),
          useValue: mockRepository,
        },
      ],
    }).compile();
    service = module.get<ArticlesService>(ArticlesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should call find() method to get all articles", async () => {
    mockRepository.find.mockResolvedValue([]);
    const articles = await service.findAll();
    expect(articles).toEqual([]);
    expect(mockRepository.find).toHaveBeenCalled();
  });
  it("should create a new article", async () => {
    const article = {
      id: 1,
      title: "article title",
      description: "article description",
    };
    mockRepository.create.mockReturnValue(article);
    mockRepository.save.mockResolvedValue(article);
    const newArticle = await service.create({
      title: "article title",
      description: "article description",
    });
    expect(newArticle).toEqual(article);
    expect(mockRepository.create).toHaveBeenCalledWith({
      title: "article title",
      description: "article description",
    });
    expect(mockRepository.save).toHaveBeenCalledWith(article);
  });
  it("should throw NotFoundException if task dose not exist", async () => {
    mockRepository.findOne.mockResolvedValue(null);
    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    expect(mockRepository.findOne).toHaveBeenCalledWith({where: {id: 1}});
  });
});
