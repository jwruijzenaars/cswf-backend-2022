import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('sysinfo')
  async getHello(): Promise<any> {
    return await this.appService.getSysInfo();
  }
}
