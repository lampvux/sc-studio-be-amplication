import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { SmartContractService } from "./smartContract.service";
import { SmartContractControllerBase } from "./base/smartContract.controller.base";

@swagger.ApiTags("smartContracts")
@common.Controller("smartContracts")
export class SmartContractController extends SmartContractControllerBase {
  constructor(
    protected readonly service: SmartContractService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
