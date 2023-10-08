import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SmartContractLogServiceBase } from "./base/smartContractLog.service.base";

@Injectable()
export class SmartContractLogService extends SmartContractLogServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
