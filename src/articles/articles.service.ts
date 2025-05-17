import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateArticleDto} from "./dto/create-article.dto";
import {UpdateArticleDto} from "./dto/update-article.dto";
import {Article} from "./entities/article.entity";

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>
  ) {}

  async findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({where: {id}});
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }

  async create({title, description}: CreateArticleDto): Promise<Article> {
    const newArticle = this.articleRepository.create({title, description});
    return this.articleRepository.save(newArticle);
  }

  async update(
    id: number,
    {title, description}: UpdateArticleDto
  ): Promise<Article> {
    const article = await this.findOne(id);
    article.title = title;
    article.description = description;
    return this.articleRepository.save(article);
  }

  async delete(id: number) {
    const article = await this.findOne(id);
    await this.articleRepository.remove(article);
    return {message: "deleted"};
  }
  async deleteAll(): Promise<string> {
    await this.articleRepository.delete({});
    return "deleted";
  }
}
