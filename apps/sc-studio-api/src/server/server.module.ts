import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ServerModuleBase } from "./base/server.module.base";
import { ServerService } from "./server.service";
import { ServerController } from "./server.controller";

@Module({
  imports: [ServerModuleBase, forwardRef(() => AuthModule)],
  controllers: [ServerController],
  providers: [ServerService],
  exports: [ServerService],
})
export class ServerModule {}
