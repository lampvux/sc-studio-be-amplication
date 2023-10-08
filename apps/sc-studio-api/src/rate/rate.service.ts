import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RateServiceBase } from "./base/rate.service.base";

@Injectable()
export class RateService extends RateServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
