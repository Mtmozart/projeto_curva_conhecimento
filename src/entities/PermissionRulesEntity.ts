import PermissionEntity from "./PermissionsEntity";
import RulesEntity from "./RuleEntity";

export default class PermissionRulesEntity{

  id: number;
  permission: PermissionEntity;
  rules: RulesEntity;

}
