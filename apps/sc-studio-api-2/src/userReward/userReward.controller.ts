import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { UserRewardService } from "./userReward.service";
import { UserRewardControllerBase } from "./base/userReward.controller.base";

@swagger.ApiTags("userRewards")
@common.Controller("userRewards")
export class UserRewardController extends UserRewardControllerBase {
  constructor(
    protected readonly service: UserRewardService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
