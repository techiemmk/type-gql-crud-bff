import {Configuration, Inject} from "@tsed/di";
import {PlatformApplication, ServerSettings} from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import {GlobalAcceptMimesMiddleware} from "@tsed/platform-express";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import * as cors from "cors";
import "@tsed/ajv";
import "@tsed/swagger";
import { TestMiddleware } from './middleware/test.middleware';
export const rootDir = process.cwd();

@ServerSettings({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  mount: {
    "/rest": [
      `${rootDir}/src/controllers/**/*.ts`
    ]
  },
  graphql: {
    server1: {
      path: '/graphql',
      buildSchemaOptions: {
        resolvers: [],
        emitSchemaFile: true,
      },
      serverConfig: {
        context: ({ req }) => ({
          logger: req.logger,
        })
      }
    }
  },
  swagger: [
    {
      path: "/docs"
    }
  ],
  exclude: [
    "**/*.spec.ts"
  ],
  componentsScan: [
    `${rootDir}/src/schema/**/*.ts`,
    `${rootDir}/src/middlewares/**/*.ts`
  ],
  logger: {
    debug: true,
    logRequest: true,
    requestFields: ['reqId', 'method', 'url', 'duration'],
  },
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit() {
    this.app
      .use(cors())
      .use(GlobalAcceptMimesMiddleware)
      .use(TestMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));

    return null;
  }
}
