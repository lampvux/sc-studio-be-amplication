import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ServerCostServiceBase } from "./base/serverCost.service.base";

@Injectable()
export class ServerCostService extends ServerCostServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
