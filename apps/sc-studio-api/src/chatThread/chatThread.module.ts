import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ChatThreadModuleBase } from "./base/chatThread.module.base";
import { ChatThreadService } from "./chatThread.service";
import { ChatThreadController } from "./chatThread.controller";

@Module({
  imports: [ChatThreadModuleBase, forwardRef(() => AuthModule)],
  controllers: [ChatThreadController],
  providers: [ChatThreadService],
  exports: [ChatThreadService],
})
export class ChatThreadModule {}
