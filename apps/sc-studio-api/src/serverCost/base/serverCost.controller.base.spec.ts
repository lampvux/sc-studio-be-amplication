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
import { ServerCostController } from "../serverCost.controller";
import { ServerCostService } from "../serverCost.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  cost: 42.424242424,
  createdAt: new Date(),
  endTime: new Date(),
  id: "exampleId",
  startTime: new Date(),
  unit: "exampleUnit",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  cost: 42.424242424,
  createdAt: new Date(),
  endTime: new Date(),
  id: "exampleId",
  startTime: new Date(),
  unit: "exampleUnit",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    cost: 42.424242424,
    createdAt: new Date(),
    endTime: new Date(),
    id: "exampleId",
    startTime: new Date(),
    unit: "exampleUnit",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  cost: 42.424242424,
  createdAt: new Date(),
  endTime: new Date(),
  id: "exampleId",
  startTime: new Date(),
  unit: "exampleUnit",
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

describe("ServerCost", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ServerCostService,
          useValue: service,
        },
      ],
      controllers: [ServerCostController],
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

  test("POST /serverCosts", async () => {
    await request(app.getHttpServer())
      .post("/serverCosts")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        endTime: CREATE_RESULT.endTime.toISOString(),
        startTime: CREATE_RESULT.startTime.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /serverCosts", async () => {
    await request(app.getHttpServer())
      .get("/serverCosts")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          endTime: FIND_MANY_RESULT[0].endTime.toISOString(),
          startTime: FIND_MANY_RESULT[0].startTime.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /serverCosts/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/serverCosts"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /serverCosts/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/serverCosts"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        endTime: FIND_ONE_RESULT.endTime.toISOString(),
        startTime: FIND_ONE_RESULT.startTime.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /serverCosts existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/serverCosts")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        endTime: CREATE_RESULT.endTime.toISOString(),
        startTime: CREATE_RESULT.startTime.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/serverCosts")
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
