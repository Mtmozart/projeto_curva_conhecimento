/*import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import PermissionEntity from './PermissionsEntity';
import RulesEntity from './RuleEntity';

@Entity({ name: 'permission_rules' })
export default class PermissionRulesEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => PermissionEntity, {nullable: true, cascade: true, eager: true })
  @JoinColumn()
  permission: PermissionEntity;
  @ManyToOne(() => RulesEntity, {nullable: true, cascade: true, eager: true })
  @JoinColumn()
  rules: RulesEntity[];

}*/
