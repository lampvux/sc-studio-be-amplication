import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { SmartContractLogModuleBase } from "./base/smartContractLog.module.base";
import { SmartContractLogService } from "./smartContractLog.service";
import { SmartContractLogController } from "./smartContractLog.controller";

@Module({
  imports: [SmartContractLogModuleBase, forwardRef(() => AuthModule)],
  controllers: [SmartContractLogController],
  providers: [SmartContractLogService],
  exports: [SmartContractLogService],
})
export class SmartContractLogModule {}
