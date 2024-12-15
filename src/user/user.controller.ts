import { Controller, Delete, Get, Param, Post, Put, Req, Inject, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post(':id/friendrequest/:friendId')
    @UseGuards(AuthGuard)
    async addFriendRequest(@Param() params): Promise<any> {
        return await this.userService.addFriendRequest(params.id, params.friendId);
    }

    @Delete(':id/friendrequest/:friendId')
    @UseGuards(AuthGuard)
    async cancelFriendRequest(@Param() params): Promise<any> {
        return await this.userService.cancelFriendRequest(params.id, params.friendId);
    }

    @Delete(':id/friendrequest/deny/:friendId')
    @UseGuards(AuthGuard)
    async denyFriendRequest(@Param() params): Promise<any> {
        return await this.userService.denyFriendRequest(params.id, params.friendId);
    }

    @Post(':id/friendrequest/accept/:friendId')
    @UseGuards(AuthGuard)
    async acceptFriendRequest(@Param() params): Promise<any> {
        return await this.userService.acceptFriendRequest(params.id, params.friendId);
    }

    @Get(':id/friendrequests')
    @UseGuards(AuthGuard)
    async getFriendRequests(@Param() params): Promise<any> {
        return await this.userService.getFriendRequests(params.id);
    }

    @Get(':id/friendswishlist/:friendId')
    @UseGuards(AuthGuard)
    async getFriendsWishlist(@Param() params): Promise<any> {
        return await this.userService.getFriendsWishlist(params.id, params.friendId);
    }

    @Get(':id/allfriendswishlist')
    @UseGuards(AuthGuard)
    async getAllFriendsWishlist(@Param() params): Promise<any> {
        return await this.userService.getAllFriendsWishlist(params.id);
    }

    @Delete(':id/removefriend/:friendId')
    @UseGuards(AuthGuard)
    async removeFriend(@Param() params): Promise<any> {
        return await this.userService.removeFriend(params.id, params.friendId);
    }

    @Get(':id/friends')
    @UseGuards(AuthGuard)
    async getFriends(@Param() params): Promise<any> {
        return await this.userService.getFriends(params.id);
    }

    @Post(':id/addgame/:gameId')
    @UseGuards(AuthGuard)
    async addGame(@Param() params): Promise<any> {
        return await this.userService.addOwnedGame(params.id, params.gameId);
    }

    @Delete(':id/removegame/:gameId')
    @UseGuards(AuthGuard)
    async removeGame(@Param() params): Promise<any> {
        return await this.userService.removeOwnedGame(params.id, params.gameId);
    }

    @Get(':id/games')
    @UseGuards(AuthGuard)
    async getGames(@Param() params): Promise<any> {
        return await this.userService.getOwnedGames(params.id);
    }

    @Get(':id/recommended')
    @UseGuards(AuthGuard)
    async getRecommended(@Param() params): Promise<any> {
        return await this.userService.getRecommendedGames(params.id);
    }

    @Post(':id/review/:gameId')
    @UseGuards(AuthGuard)
    async addReview(@Param() params, @Req() req): Promise<any> {
        return await this.userService.addReview(params.id, req.body, params.gameId);
    }

    @Delete(':id/review/:reviewId/:gameId')
    @UseGuards(AuthGuard)
    async removeReview(@Param() params): Promise<any> {
        return await this.userService.removeReview(params.id, params.reviewId, params.gameId);
    }

    @Get(':id/reviews')
    @UseGuards(AuthGuard)
    async getReviews(@Param() params): Promise<any> {
        return await this.userService.getReviews(params.id);
    }

    @Post(':id/wishlist/:gameId')
    @UseGuards(AuthGuard)
    async addWishlist(@Param() params): Promise<any> {
        return await this.userService.addWishlist(params.id, params.gameId);
    }

    @Get(':id/wishlist')
    @UseGuards(AuthGuard)
    async getWishlist(@Param() params): Promise<any> {
        return await this.userService.getWishlist(params.id);
    }
}