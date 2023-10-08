import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ChatMessageService } from "./chatMessage.service";
import { ChatMessageControllerBase } from "./base/chatMessage.controller.base";

@swagger.ApiTags("chatMessages")
@common.Controller("chatMessages")
export class ChatMessageController extends ChatMessageControllerBase {
  constructor(
    protected readonly service: ChatMessageService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
