import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ServerLogModuleBase } from "./base/serverLog.module.base";
import { ServerLogService } from "./serverLog.service";
import { ServerLogController } from "./serverLog.controller";

@Module({
  imports: [ServerLogModuleBase, forwardRef(() => AuthModule)],
  controllers: [ServerLogController],
  providers: [ServerLogService],
  exports: [ServerLogService],
})
export class ServerLogModule {}
