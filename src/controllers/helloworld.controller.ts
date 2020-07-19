import {Controller, Get, PathParams} from "@tsed/common";

@Controller("/hello")
export class HelloWorldController {
  @Get("/")
  sayHello() {
    return "<pre>Hello World !!! [as usual :)]</pre>";
  }

  @Get("/:name")
  sayHelloTo(@PathParams("name") name: string) {
    return "<pre>Hello "+name+ " !!!</pre>";
  }
}
