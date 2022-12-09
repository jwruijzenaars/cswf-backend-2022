import { Controller, Delete, Get, Param, Post, Put, Req, Inject, Res } from '@nestjs/common';
import { Auth } from './auth.schema';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Req() req): Promise<any> {
        const temp = await this.authService.login(req.body);
        console.log('login successful', temp);
        return temp;
    }

    @Post('register')
    async register(@Req() req): Promise<any> {
        return await this.authService.register(req.body);
    }

    @Post('validate')
    async validateAuth(@Req() req): Promise<any> {
        return await this.authService.validate(req);
    }

    @Get('user/:id')
    async getAuth(@Param() params): Promise<any> {
        return await this.authService.getAuth(params.id);
    }
}
