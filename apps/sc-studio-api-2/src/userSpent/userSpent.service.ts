import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserSpentServiceBase } from "./base/userSpent.service.base";

@Injectable()
export class UserSpentService extends UserSpentServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
