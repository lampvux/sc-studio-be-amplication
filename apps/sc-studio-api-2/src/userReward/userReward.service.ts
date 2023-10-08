import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserRewardServiceBase } from "./base/userReward.service.base";

@Injectable()
export class UserRewardService extends UserRewardServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
