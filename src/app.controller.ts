import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './modules/auth/auth-guard/auth-guard.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Public()
    getHello(): string {
        return this.appService.getHello();
    }
}
