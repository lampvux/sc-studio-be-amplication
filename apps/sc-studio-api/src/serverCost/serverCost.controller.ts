import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ServerCostService } from "./serverCost.service";
import { ServerCostControllerBase } from "./base/serverCost.controller.base";

@swagger.ApiTags("serverCosts")
@common.Controller("serverCosts")
export class ServerCostController extends ServerCostControllerBase {
  constructor(
    protected readonly service: ServerCostService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
