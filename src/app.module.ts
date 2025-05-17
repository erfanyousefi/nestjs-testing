import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {ArticlesModule} from "./articles/articles.module";
import {Article} from "./articles/entities/article.entity";
import {TasksModule} from "./tasks/tasks.module";

@Module({
  imports: [
    TasksModule,
    ArticlesModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "unit-test-db",
      autoLoadEntities: true,
      entities: [Article],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
