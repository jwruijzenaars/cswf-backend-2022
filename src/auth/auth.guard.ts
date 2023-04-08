import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<any> {


        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        try {
            const token = await this.authService.validateToken(authHeader);
            if (token) {
                return true;
            } else {
                return false;
            }
        }
        catch (err) {
            return "error: user is not authorized";
        }
    }
}