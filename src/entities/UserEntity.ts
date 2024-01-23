import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  permission_rules?: string;


  constructor(name: string, email: string, password: string, permission_rules?: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.permission_rules = permission_rules;
  }
}
