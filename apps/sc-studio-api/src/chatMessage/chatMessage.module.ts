import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ChatMessageModuleBase } from "./base/chatMessage.module.base";
import { ChatMessageService } from "./chatMessage.service";
import { ChatMessageController } from "./chatMessage.controller";

@Module({
  imports: [ChatMessageModuleBase, forwardRef(() => AuthModule)],
  controllers: [ChatMessageController],
  providers: [ChatMessageService],
  exports: [ChatMessageService],
})
export class ChatMessageModule {}
