import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ServerLogService } from "./serverLog.service";
import { ServerLogControllerBase } from "./base/serverLog.controller.base";

@swagger.ApiTags("serverLogs")
@common.Controller("serverLogs")
export class ServerLogController extends ServerLogControllerBase {
  constructor(
    protected readonly service: ServerLogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
