import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ServerCostModuleBase } from "./base/serverCost.module.base";
import { ServerCostService } from "./serverCost.service";
import { ServerCostController } from "./serverCost.controller";

@Module({
  imports: [ServerCostModuleBase, forwardRef(() => AuthModule)],
  controllers: [ServerCostController],
  providers: [ServerCostService],
  exports: [ServerCostService],
})
export class ServerCostModule {}
