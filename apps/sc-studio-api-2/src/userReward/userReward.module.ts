import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { UserRewardModuleBase } from "./base/userReward.module.base";
import { UserRewardService } from "./userReward.service";
import { UserRewardController } from "./userReward.controller";

@Module({
  imports: [UserRewardModuleBase, forwardRef(() => AuthModule)],
  controllers: [UserRewardController],
  providers: [UserRewardService],
  exports: [UserRewardService],
})
export class UserRewardModule {}
