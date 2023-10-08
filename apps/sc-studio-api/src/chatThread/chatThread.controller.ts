import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ChatThreadService } from "./chatThread.service";
import { ChatThreadControllerBase } from "./base/chatThread.controller.base";

@swagger.ApiTags("chatThreads")
@common.Controller("chatThreads")
export class ChatThreadController extends ChatThreadControllerBase {
  constructor(
    protected readonly service: ChatThreadService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
