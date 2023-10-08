import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { UserSpentService } from "./userSpent.service";
import { UserSpentControllerBase } from "./base/userSpent.controller.base";

@swagger.ApiTags("userSpents")
@common.Controller("userSpents")
export class UserSpentController extends UserSpentControllerBase {
  constructor(
    protected readonly service: UserSpentService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
