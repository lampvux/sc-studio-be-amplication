import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { UserRewardController } from "../userReward.controller";
import { UserRewardService } from "../userReward.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  appliedAt: new Date(),
  createdAt: new Date(),
  expiredAt: new Date(),
  id: "exampleId",
  log: "exampleLog",
  point: 42,
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  appliedAt: new Date(),
  createdAt: new Date(),
  expiredAt: new Date(),
  id: "exampleId",
  log: "exampleLog",
  point: 42,
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    appliedAt: new Date(),
    createdAt: new Date(),
    expiredAt: new Date(),
    id: "exampleId",
    log: "exampleLog",
    point: 42,
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  appliedAt: new Date(),
  createdAt: new Date(),
  expiredAt: new Date(),
  id: "exampleId",
  log: "exampleLog",
  point: 42,
  updatedAt: new Date(),
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("UserReward", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: UserRewardService,
          useValue: service,
        },
      ],
      controllers: [UserRewardController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /userRewards", async () => {
    await request(app.getHttpServer())
      .post("/userRewards")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        appliedAt: CREATE_RESULT.appliedAt.toISOString(),
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        expiredAt: CREATE_RESULT.expiredAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /userRewards", async () => {
    await request(app.getHttpServer())
      .get("/userRewards")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          appliedAt: FIND_MANY_RESULT[0].appliedAt.toISOString(),
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          expiredAt: FIND_MANY_RESULT[0].expiredAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /userRewards/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/userRewards"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /userRewards/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/userRewards"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        appliedAt: FIND_ONE_RESULT.appliedAt.toISOString(),
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        expiredAt: FIND_ONE_RESULT.expiredAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /userRewards existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/userRewards")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        appliedAt: CREATE_RESULT.appliedAt.toISOString(),
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        expiredAt: CREATE_RESULT.expiredAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/userRewards")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
