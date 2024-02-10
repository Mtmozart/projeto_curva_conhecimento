import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import SpacedRepetition from "./SpacedRepetitionEntity";
import SpacedRepetitionEntity from "./SpacedRepetitionEntity";
import PermissionRulesEntity from "./PermissionRulesEntity";

@Entity()
export default class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  name: string;
  @Column({unique: true})
  email: string;
  @Column()
  password: string;
 @ManyToMany(() => PermissionRulesEntity, {nullable: true, cascade: true, eager: true })
  @JoinTable()
  permission_rules?: PermissionRulesEntity;
  @OneToMany(() => SpacedRepetitionEntity, (spacedRepetition) => spacedRepetition.user, {nullable: true, cascade: true, eager: true })
  spacedRepetition?: SpacedRepetitionEntity[];


  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;

  }
}
