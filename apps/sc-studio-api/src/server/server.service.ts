import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ServerServiceBase } from "./base/server.service.base";

@Injectable()
export class ServerService extends ServerServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
