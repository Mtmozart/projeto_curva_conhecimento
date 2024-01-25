import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export default class RulesEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
}

