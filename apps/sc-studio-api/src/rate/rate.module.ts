import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { RateModuleBase } from "./base/rate.module.base";
import { RateService } from "./rate.service";
import { RateController } from "./rate.controller";

@Module({
  imports: [RateModuleBase, forwardRef(() => AuthModule)],
  controllers: [RateController],
  providers: [RateService],
  exports: [RateService],
})
export class RateModule {}
