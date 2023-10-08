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
import { UserController } from "../user.controller";
import { UserService } from "../user.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  billingInformation: "exampleBillingInformation",
  code_2Fa: "exampleCode_2Fa",
  createdAt: new Date(),
  email: "exampleEmail",
  enabled_2Fa: "true",
  expiredAt_2Fa: new Date(),
  firstName: "exampleFirstName",
  googleUid: "exampleGoogleUid",
  id: "exampleId",
  lastName: "exampleLastName",
  loggedInAt: new Date(),
  password: "examplePassword",
  publicWalletAddress: "examplePublicWalletAddress",
  tokenExpirationAt: new Date(),
  type_2Fa: "exampleType_2Fa",
  updatedAt: new Date(),
  username: "exampleUsername",
  userToken: "exampleUserToken",
  verifiedAt: new Date(),
};
const CREATE_RESULT = {
  billingInformation: "exampleBillingInformation",
  code_2Fa: "exampleCode_2Fa",
  createdAt: new Date(),
  email: "exampleEmail",
  enabled_2Fa: "true",
  expiredAt_2Fa: new Date(),
  firstName: "exampleFirstName",
  googleUid: "exampleGoogleUid",
  id: "exampleId",
  lastName: "exampleLastName",
  loggedInAt: new Date(),
  password: "examplePassword",
  publicWalletAddress: "examplePublicWalletAddress",
  tokenExpirationAt: new Date(),
  type_2Fa: "exampleType_2Fa",
  updatedAt: new Date(),
  username: "exampleUsername",
  userToken: "exampleUserToken",
  verifiedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    billingInformation: "exampleBillingInformation",
    code_2Fa: "exampleCode_2Fa",
    createdAt: new Date(),
    email: "exampleEmail",
    enabled_2Fa: "true",
    expiredAt_2Fa: new Date(),
    firstName: "exampleFirstName",
    googleUid: "exampleGoogleUid",
    id: "exampleId",
    lastName: "exampleLastName",
    loggedInAt: new Date(),
    password: "examplePassword",
    publicWalletAddress: "examplePublicWalletAddress",
    tokenExpirationAt: new Date(),
    type_2Fa: "exampleType_2Fa",
    updatedAt: new Date(),
    username: "exampleUsername",
    userToken: "exampleUserToken",
    verifiedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  billingInformation: "exampleBillingInformation",
  code_2Fa: "exampleCode_2Fa",
  createdAt: new Date(),
  email: "exampleEmail",
  enabled_2Fa: "true",
  expiredAt_2Fa: new Date(),
  firstName: "exampleFirstName",
  googleUid: "exampleGoogleUid",
  id: "exampleId",
  lastName: "exampleLastName",
  loggedInAt: new Date(),
  password: "examplePassword",
  publicWalletAddress: "examplePublicWalletAddress",
  tokenExpirationAt: new Date(),
  type_2Fa: "exampleType_2Fa",
  updatedAt: new Date(),
  username: "exampleUsername",
  userToken: "exampleUserToken",
  verifiedAt: new Date(),
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

describe("User", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: service,
        },
      ],
      controllers: [UserController],
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

  test("POST /users", async () => {
    await request(app.getHttpServer())
      .post("/users")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        expiredAt_2Fa: CREATE_RESULT.expiredAt_2Fa.toISOString(),
        loggedInAt: CREATE_RESULT.loggedInAt.toISOString(),
        tokenExpirationAt: CREATE_RESULT.tokenExpirationAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
        verifiedAt: CREATE_RESULT.verifiedAt.toISOString(),
      });
  });

  test("GET /users", async () => {
    await request(app.getHttpServer())
      .get("/users")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          expiredAt_2Fa: FIND_MANY_RESULT[0].expiredAt_2Fa.toISOString(),
          loggedInAt: FIND_MANY_RESULT[0].loggedInAt.toISOString(),
          tokenExpirationAt:
            FIND_MANY_RESULT[0].tokenExpirationAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
          verifiedAt: FIND_MANY_RESULT[0].verifiedAt.toISOString(),
        },
      ]);
  });

  test("GET /users/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/users"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /users/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/users"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        expiredAt_2Fa: FIND_ONE_RESULT.expiredAt_2Fa.toISOString(),
        loggedInAt: FIND_ONE_RESULT.loggedInAt.toISOString(),
        tokenExpirationAt: FIND_ONE_RESULT.tokenExpirationAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
        verifiedAt: FIND_ONE_RESULT.verifiedAt.toISOString(),
      });
  });

  test("POST /users existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/users")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        expiredAt_2Fa: CREATE_RESULT.expiredAt_2Fa.toISOString(),
        loggedInAt: CREATE_RESULT.loggedInAt.toISOString(),
        tokenExpirationAt: CREATE_RESULT.tokenExpirationAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
        verifiedAt: CREATE_RESULT.verifiedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/users")
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
