import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ServerService } from "./server.service";
import { ServerControllerBase } from "./base/server.controller.base";

@swagger.ApiTags("servers")
@common.Controller("servers")
export class ServerController extends ServerControllerBase {
  constructor(
    protected readonly service: ServerService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
