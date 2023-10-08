import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { UserSpentModuleBase } from "./base/userSpent.module.base";
import { UserSpentService } from "./userSpent.service";
import { UserSpentController } from "./userSpent.controller";

@Module({
  imports: [UserSpentModuleBase, forwardRef(() => AuthModule)],
  controllers: [UserSpentController],
  providers: [UserSpentService],
  exports: [UserSpentService],
})
export class UserSpentModule {}
