import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ServerLogServiceBase } from "./base/serverLog.service.base";

@Injectable()
export class ServerLogService extends ServerLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
