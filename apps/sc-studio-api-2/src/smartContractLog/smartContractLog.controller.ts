import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { SmartContractLogService } from "./smartContractLog.service";
import { SmartContractLogControllerBase } from "./base/smartContractLog.controller.base";

@swagger.ApiTags("smartContractLogs")
@common.Controller("smartContractLogs")
export class SmartContractLogController extends SmartContractLogControllerBase {
  constructor(
    protected readonly service: SmartContractLogService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
