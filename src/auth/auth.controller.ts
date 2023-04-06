import { Controller, Delete, Get, Param, Post, Put, Req, Inject, Res } from '@nestjs/common';
import { Auth } from './auth.schema';
import { AuthService } from './auth.service';


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

    @Post('validate')
    async validateAuth(@Req() req): Promise<any> {
        return await this.authService.validate(req);
    }

    @Get('user/:id')
    async getAuth(@Param() params): Promise<any> {
        return await this.authService.getAuth(params.id);
    }

    @Put('user/:id')
    async addToOwnedGames(@Param() params, @Req() req): Promise<any> {
        console.log('addToOwnedGames called');
        console.log('params: ', params);
        console.log('req.body: ', req.body);
        return await this.authService.addToOwnedGames(params.id, req.body);
    }
}
