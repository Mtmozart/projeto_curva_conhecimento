import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import UserEntity from "./UserEntity";

@Entity()
export default class  SpacedRepetitionEntity {
  @PrimaryGeneratedColumn()
  id?: number;
  @ManyToOne(() => UserEntity, (user) => user.spacedRepetition)
  user: UserEntity;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  firstStudy: Date;
  @Column()
  firstRevisionCourtTerm: Date;//15 minutes
  @Column()
  mediumTerm: Date; // one day
  @Column()
  longTerm: Date;// seven day
  @Column()
  upToOneMonth: Date;//one months
  @Column()
  upToTwoMonths: Date;//two months
  @Column()
  upToThreeMonths: Date;//Three months
  @Column()
  active: boolean;

  constructor(
    user: UserEntity,
    title: string,
    description: string,
    firstStudy: Date,
    firstRevisionCourtTerm: Date,
    mediumTerm: Date,
    longTerm: Date,
    upToOneMonth: Date,
    upToTwoMonths: Date,
    upToThreeMonths: Date,
    active: boolean
  ) {
    this.user = user;
    this.title = title;
    this.description = description;
    this.firstStudy = firstStudy;
    this.firstRevisionCourtTerm = firstRevisionCourtTerm;
    this.mediumTerm = mediumTerm;
    this.longTerm = longTerm;
    this.upToOneMonth = upToOneMonth;
    this.upToTwoMonths = upToTwoMonths;
    this.upToThreeMonths = upToThreeMonths;
    this.active = active;
  }



}

