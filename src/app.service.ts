import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getSysInfo(): Promise<string> {
    let sysInfo = 'This is the system information';
    sysInfo += '\n Creator: JWR';
    sysInfo += '\n Version: 1.0.0';
    sysInfo += '\n Description: This is a simple game library API';
    return sysInfo;
  }
}
