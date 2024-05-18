import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/index')
  @Render('index')
  indexPage(@Res() res: Response) {
    return { msg: "hello" }
  }
}
