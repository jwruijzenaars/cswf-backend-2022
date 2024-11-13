import { Controller, Delete, Get, Param, Post, Put, Req, Inject, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { get } from 'http';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post(':id/friendrequest/:friendId')
    async addFriendRequest(@Param() params): Promise<any> {
        return await this.userService.addFriendRequest(params.id, params.friendId);
    }

    @Delete(':id/friendrequest/:friendId')
    async cancelFriendRequest(@Param() params): Promise<any> {
        return await this.userService.cancelFriendRequest(params.id, params.friendId);
    }

    @Delete(':id/friendrequest/deny/:friendId')
    async denyFriendRequest(@Param() params): Promise<any> {
        return await this.userService.denyFriendRequest(params.id, params.friendId);
    }

    @Post(':id/friendrequest/accept/:friendId')
    async acceptFriendRequest(@Param() params): Promise<any> {
        return await this.userService.acceptFriendRequest(params.id, params.friendId);
    }

    @Get(':id/friendrequests')
    async getFriendRequests(@Param() params): Promise<any> {
        return await this.userService.getFriendRequests(params.id);
    }

    @Get(':id/friendswishlist/:friendId')
    async getFriendsWishlist(@Param() params): Promise<any> {
        return await this.userService.getFriendsWishlist(params.id, params.friendId);
    }

    @Delete(':id/removefriend/:friendId')
    async removeFriend(@Param() params): Promise<any> {
        return await this.userService.removeFriend(params.id, params.friendId);
    }

    @Get(':id/friends')
    async getFriends(@Param() params): Promise<any> {
        return await this.userService.getFriends(params.id);
    }

    @Post(':id/addgame/:gameId')
    async addGame(@Param() params): Promise<any> {
        return await this.userService.addOwnedGame(params.id, params.gameId);
    }

    @Delete(':id/removegame/:gameId')
    async removeGame(@Param() params): Promise<any> {
        return await this.userService.removeOwnedGame(params.id, params.gameId);
    }

    @Get(':id/games')
    async getGames(@Param() params): Promise<any> {
        return await this.userService.getOwnedGames(params.id);
    }

    @Get(':id/recommended')
    async getRecommended(@Param() params): Promise<any> {
        return await this.userService.getRecommendedGames(params.id);
    }

    @Post(':id/review/:gameId')
    async addReview(@Param() params, @Req() req): Promise<any> {
        return await this.userService.addReview(params.id, req.body, params.gameId);
    }

    @Delete(':id/review/:reviewId/:gameId')
    async removeReview(@Param() params): Promise<any> {
        return await this.userService.removeReview(params.id, params.reviewId, params.gameId);
    }

    @Get(':id/reviews')
    async getReviews(@Param() params): Promise<any> {
        return await this.userService.getReviews(params.id);
    }
}