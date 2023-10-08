import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ChatThreadServiceBase } from "./base/chatThread.service.base";

@Injectable()
export class ChatThreadService extends ChatThreadServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
