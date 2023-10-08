import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SmartContractServiceBase } from "./base/smartContract.service.base";

@Injectable()
export class SmartContractService extends SmartContractServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
