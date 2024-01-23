import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
