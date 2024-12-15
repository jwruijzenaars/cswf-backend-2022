import { Controller, Delete, Get, Param, Post, Put, Req, Inject, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Req() req): Promise<any> {
        var user = await this.authService.login(req.body);
        if (user) {
            return user;
        } else {
            return Promise.reject('login failed');
        }
    }

    @Post('register')
    async register(@Req() req): Promise<any> {
        return await this.authService.register(req.body);
    }

    @Get('user/:id')
    @UseGuards(AuthGuard)
    async getAuth(@Param() params): Promise<any> {
        return await this.authService.getAuth(params.id);
    }

    @Get('user')
    @UseGuards(AuthGuard)
    async getAllAuths(): Promise<any> {
        return await this.authService.getAllAuths();
    }

    @Put('user/update/:id')
    @UseGuards(AuthGuard)
    async updateAuth(@Param() params, @Req() req): Promise<any> {
        console.log('updateAuth called');
        console.log('params: ', params);
        console.log('req.body: ', req.body);
        return await this.authService.updateAuth(params.id, req.body, req.body.token);
    }

    @Post('validatetoken')
    async validateToken(@Req() req): Promise<any> {
        return await this.authService.validateToken(req.body.token);
    }
}