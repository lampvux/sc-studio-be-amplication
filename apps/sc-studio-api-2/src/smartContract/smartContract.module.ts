import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { SmartContractModuleBase } from "./base/smartContract.module.base";
import { SmartContractService } from "./smartContract.service";
import { SmartContractController } from "./smartContract.controller";

@Module({
  imports: [SmartContractModuleBase, forwardRef(() => AuthModule)],
  controllers: [SmartContractController],
  providers: [SmartContractService],
  exports: [SmartContractService],
})
export class SmartContractModule {}
