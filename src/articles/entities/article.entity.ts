import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Article {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
}
